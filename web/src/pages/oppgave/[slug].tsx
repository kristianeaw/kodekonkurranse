import Head from "next/head";
import BlockContent from "@sanity/block-content-to-react";
import client, { fetchPost, PostResponse } from "../../sanityClient";
import RedirectToNotFound from "../../components/redirectToNotFound";
import styles from "../../styles/Post.module.css";
import { useState } from "react";

const Post = (props: PostResponse) => {
  if (props.type === "NOT_FOUND") {
    return <RedirectToNotFound />;
  }

  const [inputFieldValue, setInputFieldValue] = useState("");
  const [answerState, setAnswerState] = useState<"NOT_ANSWERED" | "SUCCESS" | "WRONG_ANSWER">();
  const [attempts, setAttempts] = useState(0);

  const checkAnswer = () => {
    if (Number(inputFieldValue) === post.svar) {
      setAnswerState("SUCCESS");
    } else {
      setAnswerState("WRONG_ANSWER");
      setAttempts(attempts + 1);
    }
  };

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputFieldValue(e.currentTarget.value);
  };

  const displayResultText = () => {
    if (answerState === "NOT_ANSWERED") {
      return <></>;
    }
    if (answerState === "SUCCESS") {
      return <p className={styles.correct}>Gratulerer, dette er det riktige svaret! ✅</p>;
    }
    if (answerState === "WRONG_ANSWER") {
      return <p className={styles.wrong}>Beklager, dette er ikke riktig svar ({attempts} forsøk) ❌ Prøv på nytt.</p>;
    }
  };

  const post = props.data;

  return (
    <div className={styles.container}>
      <Head>
        <title>{post.title} - Kodekonkurranse</title>
      </Head>

      <div className={styles.header}>
        <a href={`/`} className={styles.tilbake}>
          ⬅ Tilbake
        </a>
      </div>

      <article className={styles.post}>
        <div className={styles.title}>
          <h1>{post.title.toUpperCase()}</h1>
        </div>

        <div className={styles.articleBody}>
          <BlockContent blocks={post.body} imageOptions={{ w: 320, h: 240, fit: "max" }} {...client.config()} />
        </div>

        <div className={styles.answer}>
          <input type="number" className={styles.input} onChange={onChange} />
          <button onClick={checkAnswer} className={styles.answerButton}>
            Sjekk svar
          </button>
        </div>

        {displayResultText()}

        <div>
          <a href={`/input/${post.slug.current}`} className={styles.inputLink} target={"_blank"}>
            Her kan du hente input-fila
          </a>
        </div>
      </article>
    </div>
  );
};

Post.getInitialProps = async function (context) {
  const { slug = "" } = context.query;
  return await fetchPost(slug);
};

export default Post;
