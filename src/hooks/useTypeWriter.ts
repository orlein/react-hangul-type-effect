import React from "react";
import * as Hangul from "hangul-js";

type UseTypeWriterProps = {
  text: string;
  typeDelay?: number;
  pauseDelay?: number;
};

type DisassembledText = {
  /** 분해된 자모 */
  char: string;
  /** .flat() 했을때 나오는 index */
  flatIndex: number;
  /** 원래 text string에서 해당 자모가 소속된 한글 글자의 index */
  charIndex: number;
  /** 한글이 분해될 때 그 자모가 그 한글 안에서 갖는 index */
  indexInDisassembled: number;
  /** 한글이 분해되는 과정에서, 그 index까지 조합되었을 때의 한글 모습 */
  assembledCharacter: string;
  /** 해당 indexInDisassembled까지 완성된 글자인지 아닌지 (초성중성종성이 아니라, 의도된 글자인지) */
  isFullCharacter: boolean;
};

type UseTypeWriterState = {
  /** 편의상 넣는 text */
  disassembledText: DisassembledText[];
  flatIndex: number;
};

const initialTypeWriterState: UseTypeWriterState = {
  disassembledText: [],
  flatIndex: 0,
};

/** Hook 내부에서 쓰려고 만든 타입 */
type DisassembledTextArray = {
  /** reduce안에서 기억하는 값으로 써먹으려고 만든 값... (쓰이고 버려짐) */
  flatIndex: number;
  array: DisassembledText[];
};

/** Hook 내부에서 쓰려고 만든 타입 */
type DisplayedTextResult = {
  /** 이것도 reduce 안에서 기억하는 값으로 써먹으려고 만든 값 */
  currentCharIndex: number;
  /** 실제로 화면에 보여지는 text를 위한 array */
  array: string[];
};

export default function useTypeWriter(props: UseTypeWriterProps) {
  const { text, pauseDelay = 1000, typeDelay = 100 } = props;

  const disassembledText = React.useMemo(() => {
    // 자모 그룹으로 분해함
    const disassembledTextArray = Hangul.disassemble(text, true);

    const disassembledTextArrayWithFlatIndex = disassembledTextArray.reduce(
      (acc, dCharArr, charIndex) => {
        const dCharArrayWithFlatIndex: DisassembledText[] = dCharArr.map(
          (dJamo, charArrIndex) => ({
            char: dJamo,
            flatIndex: acc.flatIndex + charArrIndex,
            charIndex,
            assembledCharacter: Hangul.assemble(
              dCharArr.slice(0, charArrIndex + 1)
            ),
            isFullCharacter: charArrIndex === dCharArr.length - 1,
            indexInDisassembled: charArrIndex,
          })
        );

        return {
          ...acc,
          flatIndex: acc.flatIndex + dCharArr.length,
          array: [...acc.array, ...dCharArrayWithFlatIndex],
        };
      },
      { flatIndex: 0, array: [] } as DisassembledTextArray
    );

    return disassembledTextArrayWithFlatIndex.array;
  }, [text]);
  // text에 한글이 포함될 경우, 분해하고 그 index를 state의 index에 집어넣음

  const [state, setState] = React.useState<UseTypeWriterState>(() => ({
    ...initialTypeWriterState,
    disassembledText,
  }));

  React.useEffect(() => {
    const fullFlatLength = disassembledText.flat().length;
    const nextIndex = state.flatIndex + 1;
    const isLastCharacter = nextIndex === fullFlatLength + 1;

    const timeout = setTimeout(
      () => {
        setState((prev) => ({
          ...prev,
          flatIndex:
            prev.flatIndex + 1 > prev.disassembledText.length
              ? 0
              : prev.flatIndex + 1,
        }));
      },
      isLastCharacter ? pauseDelay : typeDelay
    );

    return () => {
      clearTimeout(timeout);
    };
  }, [pauseDelay, state.flatIndex, disassembledText, typeDelay, text.length]);

  const displayedText = React.useMemo(() => {
    const result = disassembledText.reduce(
      (acc, cur) => {
        if (state.flatIndex > cur.flatIndex) {
          return {
            array: [
              ...acc.array.slice(0, cur.charIndex),
              cur.assembledCharacter,
            ],
            currentCharIndex: cur.charIndex,
          };
        }

        return { ...acc };
      },
      { currentCharIndex: 0, array: [] } as DisplayedTextResult
    );

    return result.array.join("");
  }, [disassembledText, state]);

  return [displayedText, state.flatIndex] as const;
}
