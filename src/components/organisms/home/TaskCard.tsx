import React from "react";
import { ITask } from "../../../types/task";

interface IProps {
  task: ITask;
}

const TaskCard: React.FC<IProps> = (props) => {
  const { task } = props;
  return (
    <div className="p-2 bg-gray-200 flex items-center justify-center border border-gray-300 cursor-pointer shadow select-none">
      <p className="text-xl text-gray-600">{task.title}</p>
    </div>
  );
};

export default TaskCard;
