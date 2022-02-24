# Twordle
## What is this?
This is a WIP Wordle clone where you have to guess two 5-letters at once. The "challenge" is that you don't know which of the two words the feedbackb you receive apply to.

## How did you make this?
From scratch using Webpack, Babel, TypeScript, React, and Sass. Test suites are still a WIP, but are using Jest and React Testing Library.

## How does it work?
The core of this app uses a Webpack boilerplate including corejs polyfills and Babel for TypeScript transpilation. The game logic leverages a set of documented React hooks that use the reducer API to manipulate the game state and the effect API to synchronize input, animation, and other presentational logic with the game state. Sass stylesheets are organized according to the 7-1 pattern.

## TODO
* [ ] more/better tests
* [ ] fix issue building with react-refresh-webpack-plugin
* [ ] add instructions and other UI elements
