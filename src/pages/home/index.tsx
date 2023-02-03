import { nanoid } from "nanoid";
import React, { useCallback, useMemo, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Board from "../../components/organisms/home/Board";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { TBoardType } from "../../types/board";
import { ICreateTaskInput, ITask } from "../../types/task";
import {
  setNewTaskLocalStorage,
  setUpdatedTaskListOnLocalStorage,
} from "../../utils/localStorage";

const initialInput: ICreateTaskInput = { title: "" };

const HomePage: React.FC = () => {
  const [taskInput, setTaskInput] = useState<ICreateTaskInput>(initialInput);

  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector((state) => state.task);

  const onTaskFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!taskInput.title) return;
    try {
      const newTask: ITask = {
        id: nanoid(5),
        title: taskInput.title,
        status: "TODO",
        timestamps: new Date(),
      };

      dispatch({
        type: "ADD_NEW_TASK",
        payload: {
          task: newTask,
        },
      });

      // save in local storage
      setNewTaskLocalStorage(newTask);

      setTaskInput(initialInput);
    } catch {}
  };

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { source, draggableId, destination } = result;
      if (!source || !draggableId || !destination) return;

      const updatedTaskList = tasks.map((task) =>
        task.id === draggableId
          ? {
              ...task,
              status: destination.droppableId as TBoardType,
              timestamps: new Date(),
            }
          : task
      );

      dispatch({
        type: "MOVE_TASK",
        payload: {
          tasks: updatedTaskList,
        },
      });
      setUpdatedTaskListOnLocalStorage(updatedTaskList);
    },
    [tasks, dispatch]
  );

  const todoTasks = useMemo(
    () => tasks.filter((task) => task.status === "TODO"),
    [tasks]
  );
  const inProgressTasks = useMemo(
    () => tasks.filter((task) => task.status === "IN_PROGRESS"),
    [tasks]
  );
  const doneTasks = useMemo(
    () => tasks.filter((task) => task.status === "DONE"),
    [tasks]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="w-full min-h-screen">
        <div className="flex items-center justify-end p-1 px-2">
          <a
            className="text-xs font-bold text-gray-600"
            href="https://github.com/saifulshihab/kanban-board"
            target="_blank"
            rel="noreferrer"
          >
            GitHub Repo Link
          </a>
        </div>
        <div className="md:container m-auto  p-5 py-10 md:p-10 md:py-20">
          <div className="w-full flex flex-col items-center gap-6">
            <div className="mb-2 md:mb-3">
              <p className="text-3xl text-primary font-extrabold">
                Kanban Board
              </p>
            </div>
            <form
              className="w-full md:w-auto flex items-center gap-3"
              onSubmit={onTaskFormSubmit}
            >
              <input
                value={taskInput.title}
                onChange={(e) => setTaskInput({ title: e.target.value })}
                placeholder="Write your task..."
                className="h-12 flex-1 px-3 border-2 text-lg outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="h-12 bg-primary border-2 border-primary px-4 text-white font-bold transform active:scale-95"
              >
                Add
              </button>
            </form>
            <div className="w-full lg:w-auto flex flex-col md:flex-row items-start gap-5">
              <Board boardType="TODO" tasks={todoTasks} />
              <Board boardType="IN_PROGRESS" tasks={inProgressTasks} />
              <Board boardType="DONE" tasks={doneTasks} />
            </div>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default HomePage;
