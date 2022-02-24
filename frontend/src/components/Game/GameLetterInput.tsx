import { GameLetter, GameLetterMode } from "../../hooks/Game/lib";

interface GameLetterInputProps {
  gameLetter: GameLetter;
  classNames: string[];
}

const modeToClassName = (mode: GameLetterMode) => {
  switch (mode) {
    case GameLetterMode.NOT_IN_WORD:
      return "0";
    case GameLetterMode.SOMEWHERE_IN_WORD:
      return "1";
    case GameLetterMode.TOTALLY_IN_WORD:
      return "2";
    default:
      break;
  }
  return "";
};

export default function GameLetterInput({
  gameLetter: { value, mode },
  classNames
}: GameLetterInputProps) {
  const getClassName = () => {
    const newClassNames = [...classNames];
    if (mode !== GameLetterMode.PENDING)
      newClassNames.push(modeToClassName(mode));
    return [
      "game__letter",
      ...newClassNames.map((name) => `game__letter--${name.toLowerCase()}`)
    ].join(" ");
  };

  return (
    <input
      type="text"
      readOnly
      className={getClassName()}
      maxLength={1}
      value={value}
    />
  );
}
