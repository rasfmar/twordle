import React, { useEffect } from "react";
import { GameInfoAction, GameInfoActionType } from "./lib";

/**
 * Handles and cleans up the effect for game input using thegame state dispatch method.
 * @param dispatch The game state dispatch method.
 */
export default function useGameInput(dispatch: React.Dispatch<GameInfoAction>) {
  useEffect(() => {
    const inputHandler = (e: KeyboardEvent) => {
      if (/^[a-z]$/i.test(e.key)) {
        dispatch({
          type: GameInfoActionType.ADD_CHAR,
          value: e.key
        });
      } else if (e.key === "Backspace") {
        dispatch({
          type: GameInfoActionType.DELETE_CHAR
        });
      } else if (e.key === "Enter") {
        dispatch({
          type: GameInfoActionType.SEAL_ROW
        });
      }
    };

    document.addEventListener("keydown", inputHandler);
    return () => document.removeEventListener("keydown", inputHandler);
  }, []);
}
