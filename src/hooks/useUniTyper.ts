import { combine, decompose } from "@beavercoding/uni-typer";
import React from "react";

type FullDecomposed = ReturnType<typeof decompose>[number];

export type UseUniTyperProps = {
	texts: string[];
	typeDelay?: number;
	deleteDelay?: number;
	pauseDelay?: number;
};

type UseTypeWriterState = {
	/** 편의상 넣는 text */
	disassembledText: FullDecomposed[];
	flatIndex: number;
	isForwarding: boolean;
};

const initialTypeWriterState: UseTypeWriterState = {
	disassembledText: [],
	flatIndex: 0,
	isForwarding: true,
};

function updateStateForwarding(prev: UseTypeWriterState) {
	const { disassembledText, flatIndex } = prev;
	const nextFlatIndex = flatIndex + 1;
	const nextIsForwarding = nextFlatIndex < disassembledText.length;
	return {
		...prev,
		flatIndex: nextFlatIndex,
		isForwarding: nextIsForwarding,
	};
}

function updateStateBackwarding(prev: UseTypeWriterState) {
	const { flatIndex } = prev;
	const nextFlatIndex = flatIndex - 1;
	const nextIsForwarding = nextFlatIndex > 0;
	return {
		...prev,
		flatIndex: Math.max(nextFlatIndex, 0),
		isForwarding: nextIsForwarding,
	};
}

export default function useUniTyper(props: UseUniTyperProps) {
	const { texts, pauseDelay = 1000, typeDelay = 100, deleteDelay = 10 } = props;

	const [textIndex, setTextIndex] = React.useState({
		index: 0,
		max: texts.length,
	});

	const text = React.useMemo(
		() => texts[textIndex.index],
		[textIndex.index, texts],
	);

	const disassembledText = React.useMemo(() => {
		return decompose(text);
	}, [text]);

	const [state, setState] = React.useState<UseTypeWriterState>(() => ({
		...initialTypeWriterState,
		disassembledText,
	}));

	const delay = React.useMemo(() => {
		const fullFlatLength = disassembledText.flat().length;
		const nextIndex = state.flatIndex + 1;
		const isLastCharacter = nextIndex === fullFlatLength + 1;
		const prevIndex = state.flatIndex - 1;
		const isFirstCharacter = prevIndex === -1;

		const nextIsForwarding =
			isFirstCharacter ||
			(state.isForwarding && !isFirstCharacter && !isLastCharacter);

		if (isLastCharacter || isFirstCharacter) {
			return pauseDelay;
		}

		if (nextIsForwarding) {
			return typeDelay;
		}

		return deleteDelay;
	}, [
		disassembledText,
		state.flatIndex,
		state.isForwarding,
		deleteDelay,
		pauseDelay,
		typeDelay,
	]);

	React.useEffect(() => {
		const timeout = setTimeout(() => {
			setState((prev) => {
				const fullFlatLength = disassembledText.flat().length;
				const nextIndex = prev.flatIndex + 1;
				const isLastCharacter = nextIndex === fullFlatLength + 1;
				const prevIndex = prev.flatIndex - 1;
				const isFirstCharacter = prevIndex === -1;

				const next = prev.isForwarding
					? updateStateForwarding(prev)
					: updateStateBackwarding(prev);

				const nextIsForwarding =
					isFirstCharacter ||
					(prev.isForwarding && !isFirstCharacter && !isLastCharacter);

				if (!prev.isForwarding && nextIsForwarding) {
					setTextIndex((prev) => ({
						...prev,
						index: (prev.index + 1) % prev.max,
					}));
				}

				return {
					...next,
					isForwarding: nextIsForwarding,
				};
			});
		}, delay);

		return () => {
			clearTimeout(timeout);
		};
	}, [disassembledText, delay]);

	const displayedText = React.useMemo(
		() =>
			combine(
				disassembledText
					.slice(0, state.flatIndex)
					.map((v) => v.decomposedAtIndex),
			),
		[disassembledText, state],
	);

	return [displayedText, state] as const;
}
