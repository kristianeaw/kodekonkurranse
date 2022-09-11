// next.config.js
/*
 * Let's reuse the client configuration. I have rewritten
 * it as a CommonJS module just to make it runs in a Node
 * environment without any fuzz.
 */

const sanityClient = require("@sanity/client");
const client = sanityClient({
  projectId: "0qjy2zkc", // you can find this in sanity.json
  dataset: "production", // or the name you chose in step 1
  useCdn: true, // `false` if you want to ensure fresh data
});

module.exports = {
  // Make sure that your node enviroment supports async/await
  exportPathMap: async function (defaultPathMap) {
    const path = await client
      // get all the posts and return those with slugs
      .fetch('*[_type == "post"].slug.current')
      .then((data) =>
        // use reduce to build an object with routes
        // and select the blog.js file, and send in the
        // correct query paramater.
        data.reduce((acc, slug) => {
          const page =
            process.env.NODE_ENV.trim() === "development"
              ? { [`/oppgave/${slug}`]: { page: `/oppgave/${slug}`, query: { slug } } }
              : { [`/oppgave/${slug}`]: { page: "/oppgave/[slug]", query: { slug } } };

          const input =
            process.env.NODE_ENV.trim() === "development"
              ? { [`/input/${slug}`]: { page: `/input/${slug}`, query: { slug } } }
              : { [`/input/${slug}`]: { page: "/input/[slug]", query: { slug } } };

          return {
            "/": { page: "/" },
            ...acc,
            ...page,
            ...input
          };
        }, {})
      )
      .catch(console.error);
    return path;
  },
};
