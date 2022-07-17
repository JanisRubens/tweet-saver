import React from "react";

type TweetContainerProps = {
  children?: React.ReactNode;
};

const TweetContainer: React.FC<TweetContainerProps> = ({ children }) => {
  return (
    <div className="flex flex-col border-solid border-2 border-blue-400 h-128 overflow-hidden overflow-y-scroll">
      {children}
    </div>
  );
};

export default TweetContainer;
