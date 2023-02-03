import { ITask } from "../../../types/task";
import { getTasksFromLocalStorage } from "../../../utils/localStorage";
import { ITaskActionTypes } from "./actionTypes";

interface ITaskState {
  tasks: ITask[];
}

let initialState: ITaskState = {
  tasks: [],
};

const localStorageTasks = getTasksFromLocalStorage();

if (localStorageTasks) {
  const { tasks } = localStorageTasks;
  initialState = {
    tasks,
  };
}

export const task = (
  state = initialState,
  action: ITaskActionTypes
): ITaskState => {
  switch (action.type) {
    case "ADD_NEW_TASK":
      return { ...state, tasks: [...state.tasks, action.payload.task] };

    case "MOVE_TASK":
      return { tasks: action.payload.tasks };

    default:
      return state;
  }
};
