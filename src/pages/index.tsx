import React from "react";
import TypeWriter from "../components/TypeWriter";
import styles from "../styles/Home.module.css";

export default function HomePage() {
  const texts = React.useMemo(
    () => [
      "첫번째 한글문장",
      "두번째는 영어문장이 섞여있는데 This is English sentence",
      "세번째는 그냥 또 한글문장",
      "네번째는 그냥 lorem ipsum dolor sit amet 어쩌구저쩌구",
    ],
    []
  );
  return (
    <main>
      <div>
        <p>Pause Delay: 1000 ms</p>
        <p>Type Delay: 50 ms </p>
        <p>Delete Delay: 10 ms </p>
      </div>
      <div>
        {texts.map((v) => (
          <ul key={v}>{v}</ul>
        ))}
      </div>
      <p />
      <hr />
      <TypeWriter
        texts={texts}
        pauseDelay={1000}
        typeDelay={50}
        deleteDelay={10}
      />
    </main>
  );
}
