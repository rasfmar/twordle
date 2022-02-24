import React, { useLayoutEffect, useRef } from "react";

/**
 * Handles an effect to scrolls the viewport to the current row of the game state.
 * @param row The current row number of the game state.
 * @returns A reference that needs to be associated with the current row.
 */
export default function useGameScroll(
  row: number
): React.MutableRefObject<HTMLDivElement> {
  const currRowRef = useRef<HTMLDivElement>();

  useLayoutEffect(() => {
    window.scrollTo(0, currRowRef.current.offsetTop);
  }, [row]);

  return currRowRef;
}
