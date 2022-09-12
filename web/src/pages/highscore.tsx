import Head from "next/head";
import { useState, useEffect } from "react";
import { fetchHighscore, HighscoreResponse } from "../sanityClient";
import styles from "../styles/Highscore.module.css";

export default function Home() {
  const [highscoreState, setHighscoreState] = useState<HighscoreResponse>({
    type: "LOADING",
  });

  console.log(highscoreState);

  useEffect(() => {
    fetchAllHighscore();
  }, []);

  const fetchAllHighscore = () => {
    fetchHighscore().then((response) => setHighscoreState(response));
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Kodekonkurranse</title>
      </Head>

      <header className={styles.header}>
        <h1>HIGHSCORE</h1>
      </header>

      <main className={styles.main}>
        <HighscoreSection highscoreState={highscoreState} />
      </main>
    </div>
  );
}

interface HighscoreSectionState {
  highscoreState: HighscoreResponse;
}

export const HighscoreSection = ({ highscoreState }: HighscoreSectionState) => {
  if (highscoreState.type === "ERROR" || highscoreState.type === "LOADING") {
    return <></>;
  }
  

  const renderEmoji = (index: number) => {
    console.log(index);
    if (index === 0) {
        return "🥇";
    }
    if (index === 1) {
        return "🥈";
    }
    if (index === 2) {
        return "🥉";
    }
    return index;
  }

  return (
    <section className={styles.highscores}>
      {highscoreState.data.map((poeng, i) => {
        return (
          <div className={styles.poeng} key={poeng.navn}>
            <div className={styles.emoji}>{renderEmoji(i)}</div> <div><b>{poeng.navn}</b></div> <div>{poeng.poeng}</div>
          </div>
        );
      })}
    </section>
  );
};
