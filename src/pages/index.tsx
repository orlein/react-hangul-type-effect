import React from "react";
import TypeWriter from "../components/TypeWriter";
import styles from "../styles/Home.module.css";

export default function HomePage() {
  const [pauseDelay, setPauseDelay] = React.useState(1000);
  const [typeDelay, setTypeDelay] = React.useState(200);

  return (
    <main>
      <div>
        <span>Pause Delay:</span>
        <input
          placeholder="pauseDelay"
          value={pauseDelay}
          onChange={(e) => setPauseDelay(Number(e.target.value))}
          type="number"
        />
        <span>Type Delay:</span>
        <input
          placeholder="typeDelay"
          value={typeDelay}
          onChange={(e) => setTypeDelay(Number(e.target.value))}
          type="number"
        />
      </div>
      <TypeWriter
        text="헬로월드HelloWorld안녕안녕ㅋㅋㅋ히히히메롱메롱wefkljlwekjf"
        pauseDelay={pauseDelay}
        typeDelay={typeDelay}
      />
    </main>
  );
}
