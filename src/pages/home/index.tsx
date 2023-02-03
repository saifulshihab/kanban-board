import { nanoid } from "nanoid";
import React, { useState } from "react";
import Board from "../../components/organisms/home/BoardColumn";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { ICreateTaskInput, ITask } from "../../types/task";
import { setNewTaskLocalStorage } from "../../utils/localStorage";

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
        status: "TODO",
        title: taskInput.title,
      };

      dispatch({
        type: "ADD_NEW_TASK",
        payload: {
          task: newTask,
        },
      });

      // save in ls
      setNewTaskLocalStorage(newTask);

      setTaskInput(initialInput);
    } catch {}
  };

  return (
    <div className="w-full min-h-screen">
      <div className="md:container m-auto  p-5 py-10 md:p-10 md:py-20">
        <div className="w-full flex flex-col items-center gap-6">
          <div className="mb-2 md:mb-3">
            <p className="text-3xl text-primary font-extrabold">Kanban Board</p>
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
            <Board boardType="TODO" tasks={tasks} />
            <Board boardType="IN_PROGRESS" tasks={[]} />
            <Board boardType="DONE" tasks={[]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
