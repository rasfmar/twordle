import React, { useReducer } from "react";
import cloneDeep from "lodash.clonedeep";
import { v4 as uuid } from "uuid";
import {
  AMOUNT_OF_CHARS,
  GameAnimation,
  GameInfoAction,
  GameInfoActionType,
  GameInfoState,
  GameLetter,
  GameLetterMode,
  GameStatus
} from "./lib";
import dictionary from "./dictionary";

const PLAUSIBLE_DICTIONARY_LENGTH = 1000;
const PLAUSIBLE_DICTIONARY = dictionary.slice(0, PLAUSIBLE_DICTIONARY_LENGTH);
const DICTIONARY_SET = new Set(dictionary);

/**
 * Initializes an new row for the game state.
 * @returns The new row.
 */
const generateNewGameRow = (): GameLetter[] => {
  const emptyRow = Array.from<GameLetter>({ length: AMOUNT_OF_CHARS });

  for (let i = 0; i < AMOUNT_OF_CHARS; i++) {
    emptyRow[i] = {
      value: "",
      mode: GameLetterMode.PENDING
    };
  }

  return emptyRow;
};

/**
 * Finds two random words in the plausible dictionary and combines them to create a new answer for the game state.
 * @returns The new answer.
 */
const generateNewAnswer = (): string => {
  const pickRandomIndex = () =>
    Math.floor(Math.random() * PLAUSIBLE_DICTIONARY_LENGTH);

  const pickOne = pickRandomIndex();
  let pickTwo = pickRandomIndex();

  while (pickOne === pickTwo) {
    pickTwo = pickRandomIndex();
  }

  return PLAUSIBLE_DICTIONARY[pickOne] + PLAUSIBLE_DICTIONARY[pickTwo];
};

/**
 * Calculates and sets the display modes for all letters in the current row.
 * @param state A copy of the current game state.
 */
const setGameLetterModes = (state: GameInfoState): void => {
  const { answer, grid, row } = state;
  const answerCharSet: Record<string, Set<number>> = {};

  for (let i = 0; i < answer.length; i++) {
    if (!(answer[i] in answerCharSet)) answerCharSet[answer[i]] = new Set();
    answerCharSet[answer[i]].add(i);
  }

  for (let i = 0; i < grid[row].length; i++) {
    const letter = grid[row][i];
    letter.mode = GameLetterMode.NOT_IN_WORD;
    if (answer[i] === letter.value) {
      letter.mode = GameLetterMode.TOTALLY_IN_WORD;
      answerCharSet[answer[i]].delete(i);
    }
  }

  for (let i = 0; i < grid[row].length; i++) {
    const letter = grid[row][i];
    if (
      letter.mode !== GameLetterMode.TOTALLY_IN_WORD &&
      letter.value in answerCharSet &&
      answerCharSet[letter.value].size > 0
    ) {
      letter.mode = GameLetterMode.SOMEWHERE_IN_WORD;
      answerCharSet[letter.value].delete(
        answerCharSet[letter.value][Symbol.iterator]().next().value
      );
    }
  }
};

/**
 * Returns true if the game has not been won.
 * @param state A copy of the current game state.
 * @returns A boolean indicating if the game has not been won.
 */
const haveNotWonTheGame = (state: GameInfoState) =>
  state.grid[state.row].some(
    (letter) => letter.mode !== GameLetterMode.TOTALLY_IN_WORD
  );

/**
 * Returns whether the attempted guess was valid or not by checking each word in the guess against the dictionary.
 * @param state A copy of the current game state.
 * @returns A boolean indicating whether or not the attempted guess was valid.
 */
const isValidGuess = (state: GameInfoState) => {
  const guess = state.grid[state.row].map((letter) => letter.value).join("");
  const wordOne = guess.slice(0, 5);
  const wordTwo = guess.slice(5);
  return DICTIONARY_SET.has(wordOne) && DICTIONARY_SET.has(wordTwo);
};

/**
 * Adds a single character to the current row of the game state.
 * @param state A copy of the current game state.
 * @param char The character to add.
 * @returns A boolean indicating whether or not the operation succeeded.
 */
const addCharToState = (state: GameInfoState, char: string) => {
  // if we can't add more characters, return early
  if (state.column === AMOUNT_OF_CHARS) return false;
  state.grid[state.row][state.column].value = char;
  state.column++;
  return true;
};

/**
 * Deletes the last typed character in the current row of the game state.
 * @param state A copy of the current game state.
 * @returns A boolean indicating whether or not the operation succeeded.
 */
const deleteCharFromState = (state: GameInfoState) => {
  // if we can't remove more characters, return early
  if (state.column === 0) return false;
  state.grid[state.row][state.column - 1].value = "";
  state.column--;
  return true;
};

/**
 * Seals the current row in the game state by scoring the attempt and adding a new row.
 * @param state A copy of the current game state.
 * @returns A boolean indicating whether or not the operation succeeded.
 */
const sealRowInState = (state: GameInfoState) => {
  if (state.column !== AMOUNT_OF_CHARS || !isValidGuess(state)) {
    return false;
  }

  setGameLetterModes(state);

  if (haveNotWonTheGame(state)) {
    state.grid.push(generateNewGameRow());
    state.row++;
    state.column = 0;
  } else {
    state.status = GameStatus.WON;
  }

  return true;
};

const generateNewState = (): GameInfoState => ({
  id: uuid(),
  grid: [generateNewGameRow(), generateNewGameRow()],
  answer: generateNewAnswer(),
  row: 0,
  column: 0,
  status: GameStatus.PLAYING
});

/**
 * Handles all stateful logic for the game.
 * @param params A method that invokes an animation given an animation type.
 * @returns An object that exposes the game state and dispatch method.
 */
export default function useGameInfo(
  startAnimation: (anim: GameAnimation) => void
): {
  gameInfo: GameInfoState;
  dispatch: React.Dispatch<GameInfoAction>;
} {
  const [gameInfo, dispatch] = useReducer(
    (state: GameInfoState, action: GameInfoAction) => {
      let newState;
      let actionSucceeded = false;

      switch (action.type) {
        case GameInfoActionType.ADD_CHAR:
          newState = cloneDeep(state);
          actionSucceeded = addCharToState(newState, action.value);
          break;
        case GameInfoActionType.DELETE_CHAR:
          newState = cloneDeep(state);
          actionSucceeded = deleteCharFromState(newState);
          break;
        case GameInfoActionType.SEAL_ROW:
          newState = cloneDeep(state);
          actionSucceeded = sealRowInState(newState);
          break;
        case GameInfoActionType.RESET_GAME:
          newState = generateNewState();
          actionSucceeded = true;
          break;
        default:
          throw new Error(`Invalid action ${action}`);
      }

      if (!actionSucceeded) {
        startAnimation(GameAnimation.SHAKING);
      }

      return newState;
    },
    generateNewState()
  );

  return { gameInfo, dispatch };
}
