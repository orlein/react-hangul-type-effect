import React from "react";
import * as Hangul from "hangul-js";
import useTypeWriter from "../hooks/useTypeWriter";

type TypeWriterProps = {
  text: string;
  typeDelay?: number;
  pauseDelay?: number;
};

export default function TypeWriter(props: TypeWriterProps) {
  const [displayedText, index] = useTypeWriter(props);

  return (
    <>
      <div>{props.text}</div>
      <div>{displayedText}</div>
      <div>
        {props.text.length - 1} vs {index}
      </div>
    </>
  );
}
