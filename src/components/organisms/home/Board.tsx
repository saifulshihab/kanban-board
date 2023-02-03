import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { boardColumns } from "../../../constant/board";
import { dndTypes } from "../../../constant/dnd";
import { TBoardType } from "../../../types/board";
import { ITask } from "../../../types/task";
import TaskCard from "./TaskCard";
import moment from "moment";

interface IProps {
  boardType: TBoardType;
  tasks: ITask[];
}

const Board: React.FC<IProps> = (props) => {
  const { boardType, tasks } = props;
  const tasksSorted = tasks.sort((prev, curr) =>
    moment(prev.timestamps).isBefore(curr.timestamps) ? -1 : 1
  );
  return (
    <div className="flex flex-col border border-zinc-600 w-full lg:min-w-[300px] md:max-w-[350px]">
      <div className="w-full p-2 flex items-center justify-center bg-primary">
        <p className="text-2xl text-gray-800 font-semibold truncate">
          {boardColumns[boardType]}
        </p>
      </div>
      <Droppable droppableId={boardType} type={dndTypes.TASK}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`p-4 px-6 flex flex-col gap-3 ${
              snapshot.isDraggingOver ? "bg-primary bg-opacity-5" : "bg-white"
            }`}
          >
            {tasksSorted.length ? (
              tasksSorted.map((task, idx) => {
                return (
                  <Draggable key={task.id} draggableId={task.id} index={idx}>
                    {(provided, snapshot) => (
                      <TaskCard
                        dragRef={provided.innerRef}
                        task={task}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        isDragging={snapshot.isDragging}
                      />
                    )}
                  </Draggable>
                );
              })
            ) : (
              <p className="text-sm text-center text-gray-400">No tasks</p>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Board;
