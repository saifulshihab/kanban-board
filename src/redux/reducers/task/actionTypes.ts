import { ITask } from "../../../types/task";

export const ADD_NEW_TASK = "ADD_NEW_TASK";
export const MOVE_TASK = "MOVE_TASK";

interface IAddNewTaskAction {
  type: typeof ADD_NEW_TASK;
  payload: {
    task: ITask;
  };
}

interface IMoveTask {
  type: typeof MOVE_TASK;
  payload: {
    tasks: ITask[];
  };
}

export type ITaskActionTypes = IAddNewTaskAction | IMoveTask;
