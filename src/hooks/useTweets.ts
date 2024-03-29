import { useEffect, useState } from "react";
import { Tweet } from "../types";

type UseTweetsProps = {
  query: string;
  count: number;
};

const useTweets = ({ query, count }: UseTweetsProps) => {
  const [tweets, setTweets] = useState<Array<Tweet>>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!query.length) {
      return;
    }
    (async () => {
      try {
        setLoading(true);
        // Since we only have one url like this, I will do it here
        // But in general it would be better to make local/prod configs
        const apiUrl =
          process.env.NODE_ENV === "development"
            ? `/api`
            : `https://tweetsaver.herokuapp.com/`;
        const tweetResponse = await fetch(
          `${apiUrl}?q=${query}&count=${count}`
        );
        if (tweetResponse.ok) {
          const tweetJSON = await tweetResponse.json();
          setTweets(tweetJSON.tweets);
        } else {
          throw Error(await tweetResponse.text());
        }
      } catch (e) {
        if (e instanceof Error) {
          setError(e);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [query, count]);

  return { tweets, loading, error };
};

export default useTweets;
