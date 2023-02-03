import { ITask } from "../types/task";

interface ILocalStorage {
  tasks: string;
}

const LOCAL_STORAGE_KEYS: ILocalStorage = {
  tasks: "kanban.board.task",
};

export const setNewTaskLocalStorage = (task: ITask) => {
  const lsTasks = localStorage.getItem(LOCAL_STORAGE_KEYS.tasks);
  const prevTasks = lsTasks ? (JSON.parse(lsTasks) as ITask[]) : [];
  const tasks: ITask[] = [...prevTasks, task];
  localStorage.setItem(LOCAL_STORAGE_KEYS.tasks, JSON.stringify(tasks));
};

export const setUpdatedTaskListOnLocalStorage = (tasks: ITask[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.tasks, JSON.stringify(tasks));
};

export const getTasksFromLocalStorage = () => {
  const tasks = localStorage.getItem(LOCAL_STORAGE_KEYS.tasks);
  if (tasks) {
    return {
      tasks: JSON.parse(tasks) as ITask[],
    };
  }
};
