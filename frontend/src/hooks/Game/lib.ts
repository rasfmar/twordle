export const AMOUNT_OF_CHARS = 10;

export enum GameAnimation {
  SHOWING = "SHOWING",
  SHAKING = "SHAKING"
}

export enum GameInfoActionType {
  ADD_CHAR = "ADD_CHAR",
  DELETE_CHAR = "DELETE_CHAR",
  SEAL_ROW = "SEAL_ROW",
  RESET_GAME = "RESET_GAME"
}

export enum GameLetterMode {
  PENDING = "PENDING",
  NOT_IN_WORD = "NOT_IN_WORD",
  SOMEWHERE_IN_WORD = "SOMEWHERE_IN_WORD",
  TOTALLY_IN_WORD = "TOTALLY_IN_WORD"
}

export enum GameStatus {
  PLAYING = "PLAYING",
  WON = "WON"
}

export interface GameLetter {
  value: string;
  mode: GameLetterMode;
}

export interface GameInfoState {
  id: string;
  grid: GameLetter[][];
  row: number;
  column: number;
  answer: string;
  status: GameStatus;
}

export type GameInfoAction =
  | { type: GameInfoActionType.ADD_CHAR; value: string }
  | { type: GameInfoActionType.DELETE_CHAR }
  | { type: GameInfoActionType.SEAL_ROW }
  | { type: GameInfoActionType.RESET_GAME };
