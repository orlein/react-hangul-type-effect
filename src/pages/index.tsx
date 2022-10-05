import React from "react";
import TypeWriter from "../components/TypeWriter";
import styles from "../styles/Home.module.css";

export default function HomePage() {
  const [pauseDelay, setPauseDelay] = React.useState(1000);
  const [typeDelay, setTypeDelay] = React.useState(50);

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
        texts={[
          "첫번째 한글문장",
          "두번째는 영어문장이 섞여있는데 This is English sentence",
          "세번째는 그냥 또 한글문장",
          "네번째는 그냥 lorem ipsum dolor sit amet 어쩌구저쩌구",
        ]}
        pauseDelay={pauseDelay}
        typeDelay={typeDelay}
      />
    </main>
  );
}
