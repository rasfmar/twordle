import GameLetterInput from "./GameLetterInput";
import useGameAnimations from "../../hooks/Game/useGameAnimations";
import useGameScroll from "../../hooks/Game/useGameScroll";
import useGameInput from "../../hooks/Game/useGameInput";
import useGameInfo from "../../hooks/Game/useGameInfo";

export default function Game() {
  const { startAnimation, getAnimations } = useGameAnimations();
  const {
    gameInfo: { id, grid, row },
    dispatch
  } = useGameInfo(startAnimation);
  const currRowRef = useGameScroll(row);

  useGameInput(dispatch);

  return (
    <div className="game">
      {grid.map((gameRow, rowIdx) => (
        <div
          className="game__row"
          ref={rowIdx === row ? currRowRef : undefined}
          // the index associated with a row never changes
          // eslint-disable-next-line react/no-array-index-key
          key={`game-${id}-row-${rowIdx}`}
        >
          {gameRow.map((gameLetter, letterIdx) => (
            <GameLetterInput
              // the amount of items per row never changes
              // eslint-disable-next-line react/no-array-index-key
              key={`gane-${id}-row-${rowIdx}-${letterIdx}`}
              gameLetter={gameLetter}
              classNames={getAnimations(rowIdx, row)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
