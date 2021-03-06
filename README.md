[![Build Status](https://travis-ci.org/ThomasAndrewMacLean/Teamleader-Orderbook.svg?branch=master)](https://travis-ci.org/ThomasAndrewMacLean/Teamleader-Orderbook)

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Table of Contents

- [Getting started](#getting-started)
- [Api](#api)
- [PWA](#pwa)
- [Errors](#errors)
- [Tests](#tests)
- [CI](#ci)

### Getting started

You must have node installed. Clone the repository and run `npm install` or `yarn install`.
After everything has been installed run `npm start` or `yarn start`. The site is now running on `http://localhost:3000/`.

This site is also live on [heroku](https://teamleader-orderbook.herokuapp.com/).

### Api

The api-endpoints are defined at the top of the file `src/api/api.js`. The api can be found [here](https://github.com/ThomasAndrewMacLean/Teamleader-api), and is hosted [here](https://nameless-citadel-45339.herokuapp.com/ping) on heroku.

### PWA

On android a banner will be shown, asking to install the app to the homescreen as a PWA. On ios devices this can be done by clicking the share button, and then selecting `Add to Home Screen`.

### Errors

All client side errors are logged and sent to [this trello board](https://trello.com/b/ZeoBOtZq).

### Tests

Test suites can be run with the command `npm test` or `yarn test`. Testing is done with jest. Snapshot tests will fail with older versions of node (below 7).

If tests fail on mac after latests macOS update, read this thread:
https://github.com/facebook/jest/issues/1767 (tldr: reinstall watchman with brew)

### CI

On every commit to github, the project is built using [travis](https://travis-ci.org/ThomasAndrewMacLean/Teamleader-Orderbook) and all tests are run. If all goes well the new version gets deployed on [heroku](https://teamleader-orderbook.herokuapp.com/).
