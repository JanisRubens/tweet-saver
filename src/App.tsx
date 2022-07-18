import React, { useState } from "react";
import useTweets from "./hooks/useTweets";
import TweetContainer from "./components/TweetContainer";
import SearchForm from "./components/SearchForm";
import Hero from "./components/Hero";
import DropContainer from "./components/DropContainer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TweetList from "./components/TweetList";
import useLocalTweets from "./hooks/useLocalTweets";

const App: React.FC = () => {
  const [tweetQuery, setTweetQuery] = useState<string>("");
  const [localTweets, saveTweet, removeTweet] = useLocalTweets();
  const { tweets, loading } = useTweets({
    query: tweetQuery,
    count: 15, // if time, make it also as a form input
  });

  return (
    <div className="flex flex-col mx-16 mt-16">
      <Hero />
      <div className="flex flex-row gap-x-2 ">
        <DndProvider backend={HTML5Backend}>
          <div className="flex flex-col basis-2/5">
            <SearchForm setSearchQuery={setTweetQuery} loading={loading} />
            <TweetContainer>
              <TweetList tweets={tweets} />
            </TweetContainer>
          </div>
          <div className="flex flex-col basis-1/5 items-center justify-center">
            <div className="flex">
              <h2>Drag tweets over to save</h2>
            </div>
          </div>
          <div className="flex flex-col basis-2/5">
            <h2 className="relative py-[10px] rounded text-md mb-2">
              Saved Tweets
            </h2>
            <TweetContainer>
              <DropContainer handleDrop={saveTweet}>
                <TweetList tweets={localTweets} removeTweet={removeTweet} />
              </DropContainer>
            </TweetContainer>
          </div>
        </DndProvider>
      </div>
    </div>
  );
};

export default App;
