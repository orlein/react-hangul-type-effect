import React from "react";
import styles from "./TypeWriter.module.css";

type TypeWriterProps = {
  text: string;
  typeDelay?: number;
  pauseDelay?: number;
};

type TypeWriterState = {
  index: number;
};

const initialTypeWriterState: TypeWriterState = {
  index: 0,
};

export default function TypeWriter(props: TypeWriterProps) {
  const { text, pauseDelay = 1000, typeDelay = 100 } = props;

  const [state, setState] = React.useState<TypeWriterState>(
    initialTypeWriterState
  );

  React.useEffect(() => {
    const nextIndex = state.index + 1;

    const isLastCharacter = nextIndex === text.length + 1;

    setTimeout(
      () => {
        setState({
          index: isLastCharacter ? 0 : nextIndex,
        });
      },
      isLastCharacter ? pauseDelay : typeDelay
    );
  }, [pauseDelay, state.index, text.length, typeDelay]);

  const displayedText = React.useMemo(
    () => text.slice(0, state.index),
    [state.index, text]
  );

  return <span>{displayedText}</span>;
}
