import { ITask } from "../../../types/task";

export const ADD_NEW_TASK = "ADD_NEW_TASK";

interface IAddNewTaskAction {
  type: typeof ADD_NEW_TASK;
  payload: {
    task: ITask;
  };
}

export type ITaskActionTypes = IAddNewTaskAction;
