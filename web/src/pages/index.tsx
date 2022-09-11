import Head from "next/head";
import { useState, useEffect } from "react";
import { fetchAllPosts, PostsResponse } from "../sanityClient";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [postsState, setPostsState] = useState<PostsResponse>({
    type: "LOADING",
  });

  useEffect(() => {
    fetchRecentPosts();
  }, []);

  const fetchRecentPosts = () => {
    fetchAllPosts().then((response) => setPostsState(response));
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Kodekonkurranse</title>
      </Head>

      <header className={styles.header}>
        <h1>KODEKONKURRANSE<span>.</span></h1>
      </header>

      <main className={styles.main}>
        <PostsSection postsState={postsState} />
      </main>
    </div>
  );
}

interface PostsSectionState {
  postsState: PostsResponse;
}

export const PostsSection = ({ postsState }: PostsSectionState) => {
  if (postsState.type === "ERROR" || postsState.type === "LOADING") {
    return <></>;
  }

  return (
    <section className={styles.posts}>
      {postsState.data.map((post) => {
        return (
          <a href={`/oppgave/${post.slug.current}`} key={post.slug.current} className={styles.post}>
            <div>
              <h3 className={styles.postTitle}>{post.title.toUpperCase()}</h3>
            </div>
            <div className={styles.emoji}>
              ⭐️
            </div>
          </a>
        );
      })}
    </section>
  );
};
