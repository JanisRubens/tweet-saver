import React, { useState } from "react";
import useTweets from "./hooks/useTweets";
import TweetContainer from "./components/TweetContainer";
import SearchForm from "./components/SearchForm";
import Hero from "./components/Hero";
import DropContainer from "./components/DropContainer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TweetList from "./components/TweetList";
import useLocalStorage from "./hooks/useLocalStorage";

const App: React.FC = () => {
  const [tweetQuery, setTweetQuery] = useState<string>("");
  const { value: savedTweets, saveItem } = useLocalStorage("tweet-data");
  const { tweets, loading, error } = useTweets({
    query: tweetQuery,
    count: 10,
  });
  // loading for some small noti
  console.log(tweets, loading, error);
  return (
    <div className="flex flex-col mx-16 mt-16">
      <Hero />
      <div className="flex flex-row">
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
              <DropContainer handleDrop={saveItem}>
                <TweetList tweets={savedTweets} />
              </DropContainer>
            </TweetContainer>
          </div>
        </DndProvider>
      </div>
    </div>
  );
};

export default App;
