import React from "react";
import type { DragSourceMonitor } from "react-dnd";
import { useDrag } from "react-dnd";
import { Tweet } from "../types";
import { DraggableTypes } from "../enums";
import cx from "classnames";

type TweetCardProps = {
  tweet: Tweet;
  remove?: (id: number) => void;
};

const TweetCard: React.FC<TweetCardProps> = ({ tweet, remove }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: DraggableTypes.TWEET,
      item: tweet,
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [tweet.id]
  );

  const handleRemove = () => {
    remove && remove(tweet.id);
  };

  return (
    <div
      ref={drag}
      className={cx("flex min-h-fit p-4", {
        "opacity-50": isDragging,
      })}
    >
      <div className="flex flex-row">
        <div className="flex-grow justify-self-center self-center flex mr-4 min-w-fit">
          <img
            src={tweet.user.profileImageURL}
            className="max-w-full h-auto rounded-full"
            alt={tweet.user.name}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row flex-wrap mb-2">
            <div className="mr-2">{tweet.user.name}</div>
            <div className="mr-2 text-gray-400">{`@${tweet.user.screenName}`}</div>
            <div className="text-gray-400 ml-auto">
              {new Date(tweet.createdAt).toLocaleDateString("en-eu")}
            </div>
          </div>
          <div>{tweet.text}</div>
          {remove && (
            <div>
              <label
                onClick={handleRemove}
                className="cursor-pointer text-red-400 hover:text-red-600 block text-right"
              >
                Remove tweet
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TweetCard;
