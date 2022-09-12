import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export interface SanityPost {
  slug: { current: string };
  title: String;
  body: [];
  mainImage?: {};
  svar: number;
}

export type PostResponse =
  | {
      type: "NOT_FOUND";
    }
  | {
      type: "DATA";
      data: SanityPost;
    };

export const fetchPost = async (slug: string): Promise<PostResponse> => {
  const response = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]`,
    { slug }
  );
  if (response === null) {
    return { type: "NOT_FOUND" };
  }
  return {
    type: "DATA",
    data: response,
  };
};

export type PostsResponse =
  | {
      type: "ERROR";
    }
  | {
      type: "LOADING";
    }
  | {
      type: "DATA";
      data: SanityPost[];
    };

export const fetchAllPosts = async (): Promise<PostsResponse> => {
  const response = await client.fetch(
    `*[_type == "post"] | order(id asc)`
  );
  if (response === null) {
    return { type: "ERROR" };
  }
  return {
    type: "DATA",
    data: response,
  };
};

export interface InputPost {
  body: [];
}

export type InputResponse =
  | {
      type: "NOT_FOUND";
    }
  | {
      type: "DATA";
      data: InputPost;
    };

export const fetchInput = async (slug: string): Promise<InputResponse> => {
  const response = await client.fetch(
    `*[_type == "input" && slug.current == $slug][0]`,
    { slug }
  );
  if (response === null) {
    return { type: "NOT_FOUND" };
  }
  return {
    type: "DATA",
    data: response,
  };
};

export interface Highscore {
  poeng: number;
  navn: string;
}

export type HighscoreResponse =
  | {
      type: "ERROR";
    }
  | {
      type: "LOADING";
    }
  | {
      type: "DATA";
      data: Highscore[];
    };

export const fetchHighscore = async (): Promise<HighscoreResponse> => {
  const response = await client.fetch(
    `*[_type == "poeng"] | order(poeng desc)`
  );
  if (response === null) {
    return { type: "ERROR" };
  }
  return {
    type: "DATA",
    data: response,
  };
};


export const getImageUrl = (source: {}) => {
  return imageUrlBuilder(client).image(source);
}

const client = sanityClient({
  projectId: "0qjy2zkc", // you can find this in sanity.json
  dataset: "production", // or the name you chose in step 1
  useCdn: true, // `false` if you want to ensure fresh data
});

export default client;
