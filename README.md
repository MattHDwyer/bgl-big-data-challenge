# BGL Bigdata Team: Coding Challenge:

## Installation:

Clone git repo and then `npm i --force` to install necessary NPM packages (`--force` is necessary due to issues with the ts-jest and jest libraries.

Next run `npm start` to start the web app.

## Available Scripts

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Development Guide:

These are the steps I took to develop the web app.

### Part 1 - Products:

1. Create a mock fake CRUD REST API ([using this guide](https://www.robinwieruch.de/javascript-fake-api/)). Will include:

   1. View
   2. Create
   3. Update
   4. Delete

2. Create a Product page on the route '/products' (routes set up using [react-router-dom](https://reactrouter.com/en/main/getting-started/installation)), that displays a table with all of the products.

3. Using [react-hook-form](https://react-hook-form.com/) create interactive form that writes back using mock API's.

### Part 2 - Packaging Orders:

4. Create packing orders data mock API.
   1. View\
      Data included:
   - Product Code
   - Amount
   - Price

### Part 3 - Ordering

5. Processing the order:
   1. Will have a form on the page, that asks for:\
      - Product Code
      - Amount
   2. Will return a result that shows\
      - the number of packages at each packaging option
