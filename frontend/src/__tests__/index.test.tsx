import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../pages/App";

jest.useFakeTimers();

test("app inputs work as intended", () => {
  render(<App />);
  const testGuess = "audiocrest";

  // test first input
  fireEvent.keyDown(document, { key: testGuess[0] });
  const firstInput = screen.queryByDisplayValue(testGuess[0]);
  expect(firstInput).toBeInTheDocument();

  // test invalid guess
  let firstInputClassName = firstInput.className;
  fireEvent.keyDown(document, { key: "Enter" });
  expect(firstInput.className).not.toBe(firstInputClassName);

  // test shaking animation
  firstInputClassName = firstInput.className;
  jest.advanceTimersByTime(500);
  expect(firstInput.className).not.toBe(firstInputClassName);

  // test backspace
  fireEvent.keyDown(document, { key: "Backspace" });
  expect(screen.queryByDisplayValue(testGuess[0])).not.toBeInTheDocument();

  // test rest of characters
  for (let i = 0; i < testGuess.length; i++) {
    fireEvent.keyDown(document, { key: testGuess[i] });
    expect(screen.queryByDisplayValue(testGuess[i])).toBeInTheDocument();
  }

  // test valid guess
  firstInputClassName = firstInput.className;
  fireEvent.keyDown(document, { key: "Enter" });
  expect(firstInput.className).not.toBe(firstInputClassName);
});
