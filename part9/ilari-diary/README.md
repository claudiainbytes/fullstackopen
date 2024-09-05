# Ilari Flight Diary

## [Patientor frontend](/part9/ilari-diary/flight-diary-front)

### Getting started
  - To get the app running just install its dependencies with ```npm install``` and run it with ```npm run dev```.
  - The app should work without a backend, but make sure that the request made to ```/api/ping``` made on startup is successful before continuing.

http://localhost:5173/

## [Patientor backend](/part9/ilari-diary/flight-diary)

### Getting started
 - To get the app running just install its dependencies with ```npm install``` and run it with ```npm run dev```.

 http://localhost:3000/api/diaries
 http://localhost:3000/api/diaries/2

 Send POST JSON structure

{
  weather: "sunny",
  visibility: "good",
  date: "2017-04-01",
  comment: "Everything went better than expected, I'm learning much"
}