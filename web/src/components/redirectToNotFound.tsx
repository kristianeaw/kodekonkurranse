import Head from "next/head";
import DefaultErrorPage from "next/error";

const RedirectToNotFound = () => {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <DefaultErrorPage statusCode={404} />
    </>
  );
};

export default RedirectToNotFound;