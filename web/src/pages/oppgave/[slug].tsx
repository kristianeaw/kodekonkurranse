import Head from "next/head";
import BlockContent from "@sanity/block-content-to-react";
import client, {
  fetchPost,
  PostResponse,
  getImageUrl,
} from "../../sanityClient";
import RedirectToNotFound from "../../components/redirectToNotFound";
import styles from "../../styles/Post.module.css";
import { formatDate } from "../../utils";

const Post = (props: PostResponse) => {
  if (props.type === "NOT_FOUND") {
    return <RedirectToNotFound />;
  }

  const post = props.data;

  return (
    <div>
      <Head>
        <title>{post.title} - Kodekonkurranse</title>
      </Head>

      <article className={styles.post}>
        <div className={styles.postHeader}>

          {post.mainImage && <div className={styles.image}>
            <img src={getImageUrl(post.mainImage).url()} />
          </div>}
        </div>

        <div className={styles.articleBody}>
          <BlockContent
            blocks={post.body}
            imageOptions={{ w: 320, h: 240, fit: "max" }}
            {...client.config()}
          />
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
