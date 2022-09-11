import Head from "next/head";
import BlockContent from "@sanity/block-content-to-react";
import client, { fetchInput, InputResponse } from "../../sanityClient";
import RedirectToNotFound from "../../components/redirectToNotFound";
import styles from "../../styles/Input.module.css";

const Input = (props: InputResponse) => {
  if (props.type === "NOT_FOUND") {
    return <RedirectToNotFound />;
  }

  const post = props.data;

  return (
    <div className={styles.container}>
      <Head>
        <title>{post.title} - Kodekonkurranse</title>
      </Head>

      <div className={styles.input}>
        <BlockContent blocks={post.body} imageOptions={{ w: 320, h: 240, fit: "max" }} {...client.config()} />
      </div>
    </div>
  );
};

Input.getInitialProps = async function (context) {
  const { slug = "" } = context.query;
  return await fetchInput(slug);
};

export default Input;
