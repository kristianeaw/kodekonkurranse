import Head from "next/head";
import { useState, useEffect } from "react";
import {
  fetchAllPosts,
  getImageUrl,
  PostsResponse,
} from "../sanityClient";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [postsState, setPostsState] = useState<PostsResponse>({
    type: "LOADING",
  });

  console.log(postsState);

  useEffect(() => {
    fetchRecentPosts();
  }, []);

  const fetchRecentPosts = () => {
    fetchAllPosts().then((response) => setPostsState(response));
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Kodekonkurranse</title>
      </Head>

      <header className={styles.header}>

        <div className={styles.headerInner}>
          <h1>Hackathon - Kodekonkurranse</h1>
        </div>

      </header>

      <main className={styles.main}>

        <PostsSection postsState={postsState}/>
        
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
              <h3 className={styles.postTitle}>{post.title}</h3>
            </div>

            {
              post.mainImage && 
              <div className={styles.postImage}>
                <img src={getImageUrl(post.mainImage).url()} />
              </div>
            }
          </a>
        );
      })}
    </section>
  );
};
