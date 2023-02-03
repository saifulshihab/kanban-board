import { TBoardType } from "../types/board";

export const boardColumns: Record<TBoardType, string> = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
};
