import React from "react";
import * as Hangul from "hangul-js";
import useTypeWriter, { UseTypeWriterProps } from "../hooks/useTypeWriter";

function TypeWriter(props: UseTypeWriterProps) {
  const [displayedText, state] = useTypeWriter(props);

  return (
    <>
      <div>{state.isForwarding ? "정방향 진행" : "역방향 진행"}</div>
      <h1>{displayedText}</h1>
    </>
  );
}

export default React.memo(TypeWriter);
