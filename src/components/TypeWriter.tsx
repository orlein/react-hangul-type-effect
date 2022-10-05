import React from "react";
import * as Hangul from "hangul-js";
import useTypeWriter, { UseTypeWriterProps } from "../hooks/useTypeWriter";

export default function TypeWriter(props: UseTypeWriterProps) {
  const [displayedText, state] = useTypeWriter(props);

  return (
    <>
      <div>
        {props.texts.map((v) => (
          <div key={v}>{v}</div>
        ))}
      </div>
      <p />
      <div>{displayedText}</div>
      <div>{state.isForwarding ? "정방향 진행" : "역방향 진행"}</div>
    </>
  );
}
