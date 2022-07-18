import React from "react";
import { Tweet } from "../types";
import TweetCard from "./TweetCard";

type TweetListProps = {
  tweets: Tweet[];
  removeTweet?: (id: number) => void;
};

const TweetList: React.FC<TweetListProps> = ({ tweets, removeTweet }) => {
  return (
    <div className="flex-grow flex-col divide-y divide-solid divide-blue-400">
      {tweets.map((tweet) => (
        <TweetCard key={tweet.id} tweet={tweet} remove={removeTweet} />
      ))}
    </div>
  );
};

export default TweetList;
