import React from "react";
import { ITask } from "../../../types/task";

interface IProps {
  dragRef: any;
  task: ITask;
  isDragging?: boolean;
}

const TaskCard: React.FC<IProps> = (props) => {
  const { dragRef, task, isDragging, ...rest } = props;
  return (
    <div
      ref={dragRef}
      {...rest}
      className={`p-2 bg-gray-200 flex items-center justify-center border ${
        isDragging ? "border-primary" : "border-gray-300"
      } cursor-pointer shadow select-none`}
    >
      <p className="text-xl text-gray-600">{task.title}</p>
    </div>
  );
};

export default TaskCard;
