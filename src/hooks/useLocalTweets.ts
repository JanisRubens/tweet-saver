import { useState, useEffect } from "react";
import { Tweet } from "../types";
import useLocalStorage from "./useLocalStorage";
const TWEET_KEY = "tweet-data";

const useLocalTweets = (): [
  Tweet[],
  (tweet: Tweet) => void,
  (id: number) => void
] => {
  const [value, setValue] = useLocalStorage(TWEET_KEY, []);
  const [localTweets, setLocalTweets] = useState<Tweet[]>(value);

  const saveTweet = (tweet: Tweet) => {
    setLocalTweets((prevValue) => {
      //prevent duplicate saves
      for (const savedTweet of prevValue) {
        if (savedTweet.id === tweet.id) {
          return prevValue;
        }
      }
      return [...prevValue, tweet];
    });
  };

  const removeTweet = (id: number) => {
    setLocalTweets((prevValue) => {
      const tweets = [...prevValue];
      for (const savedTweetIndex in tweets) {
        if (prevValue[savedTweetIndex].id === id) {
          tweets.splice(parseInt(savedTweetIndex), 1);
          return tweets;
        }
      }
      return prevValue;
    });
  };

  useEffect(() => {
    setValue(localTweets);
  }, [localTweets, setValue]);

  return [localTweets, saveTweet, removeTweet];
};

export default useLocalTweets;
