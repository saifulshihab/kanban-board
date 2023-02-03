import React from "react";
import { boardColumns } from "../../../constant/board";
import { TBoardColumnType } from "../../../types/board";
import { ITask } from "../../../types/task";
import TaskCard from "./TaskCard";

interface IProps {
  columnType: TBoardColumnType;
  tasks: ITask[];
}

const BoardColumn: React.FC<IProps> = (props) => {
  const { columnType, tasks } = props;
  return (
    <div className="flex flex-col border border-zinc-600 w-full lg:min-w-[300px] max-w-[350px]">
      <div className="w-full p-2 flex items-center justify-center bg-primary">
        <p className="text-2xl text-gray-800 font-semibold truncate">
          {boardColumns[columnType]}
        </p>
      </div>
      <div className="p-4 px-6 flex flex-col gap-3">
        {tasks.length ? (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        ) : (
          <p className="text-sm text-center text-gray-400">No tasks</p>
        )}
      </div>
    </div>
  );
};

export default BoardColumn;
