export type TTaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export interface ICreateTaskInput {
  title: string;
}

export interface ITask {
  id: string;
  title: string;
  status: TTaskStatus;
  timestamps: Date;
}
