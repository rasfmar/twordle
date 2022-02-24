import { useEffect, useState } from "react";
import { GameAnimation } from "./lib";

const CSS_SHAKING_ANIMATION_DURATION_IN_MS = 500;

interface UseGameAnimationsReturnType {
  startAnimation: (anim: GameAnimation) => void;
  getAnimations: (rowIdx: number, currRow: number) => string[];
}

/**
 * Handles logic for updating game animations.
 * @returns An object that contains a boolean that is true if the animation is playing and a function that starts the shaking animation.
 */
export default function useGameAnimations(): UseGameAnimationsReturnType {
  const [shaking, setShaking] = useState(false);

  useEffect(() => {
    if (shaking)
      setTimeout(() => setShaking(false), CSS_SHAKING_ANIMATION_DURATION_IN_MS);
  }, [shaking]);

  return {
    startAnimation: (anim: GameAnimation) => {
      if (anim === GameAnimation.SHAKING) setShaking(true);
    },
    getAnimations: (rowIdx: number, currRow: number) => {
      const answer = [];
      if (rowIdx <= currRow) answer.push(GameAnimation.SHOWING);
      if (shaking) answer.push(GameAnimation.SHAKING);
      return answer;
    }
  };
}
