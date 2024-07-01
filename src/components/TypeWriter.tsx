import React from "react";
import useUniTyper, { UseUniTyperProps } from "../hooks/useUniTyper";

function TypeWriter(props: UseUniTyperProps) {
  const [displayedText, state] = useUniTyper(props);

  return (
    <>
      <div>
        {state.isForwarding
          ? "정방향 진행 >>>>>>>>>>>>"
          : "역방향 진행 <<<<<<<<<<<<"}
      </div>
      <h1>{displayedText}</h1>
    </>
  );
}

export default React.memo(TypeWriter);
