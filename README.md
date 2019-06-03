# Air KOALAty Report

This project is currently running live at https://airkoalatyreport.herokuapp.com/

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## API server

Make sure `mongo` is running and then run `npm run api-dev` to run the api server.

## Environment variables

Create a `.env` file with the same fields as the `.env.default` file. `AUTH0_API_AUDIENCE` is the url for the api. I use `http://localhost:8083/api/` and set the `PORT` field to `8083`. `NODE_ENV` is set to `'dev'`.

## Auth0 variables
`clientID`, `domain`, `redirectUri`, `AUTH0_DOMAIN` are all variables from you can get from your free Auth0 account.

## World Air Quality Index variables
You can get your free api key from https://www.airvisual.com/ `AIRVISUAL_URI` is the api uri. `AIRVISUAL_API_KEY` is your api key.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests.