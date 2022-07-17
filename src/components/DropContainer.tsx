import React from "react";
import cx from "classnames";
import { useDrop } from "react-dnd";
import { DraggableTypes } from "../enums";
import { Tweet } from "../types";

type DropContainerProps = {
  children?: React.ReactNode;
  handleDrop: (tweet: Tweet) => void;
};

const DropContainer: React.FC<DropContainerProps> = ({
  children,
  handleDrop,
}) => {
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: DraggableTypes.TWEET,
      drop: (item: Tweet) => {
        handleDrop(item);
      },
      collect: (monitor: any) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    []
  );

  return (
    <div
      ref={drop}
      className={cx("flex-grow", {
        "border-solid border-2 border-blue-400": canDrop && isOver,
      })}
    >
      {children}
    </div>
  );
};

export default DropContainer;
