const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(express.static("public"));
app.use(morgan("common"));

let topMovies = [
  {
    title: "Gladiator",
    year: 2000,
    director: "Ridley Scott",
  },

  {
    title: "Troy",
    year: 2004,
    director: "Wolfgang Petersen",
  },

  {
    title: "Braveheart",
    year: 1995,
    director: "Mel Gibson",
  },

  {
    title: "Birdman",
    year: 2014,
    director: "Alejandro Gonzalez Iñarritu",
  },

  {
    title: "Hercules",
    year: 1997,
    director: "Ron Clements & John Musker",
  },

  {
    title: "Star Wars V: Empire Strikes Back",
    year: 1980,
    director: "Irvin Kershner",
  },

  {
    title: "Captain America: The First Avenger",
    year: 2011,
    director: "Joe Johnston",
  },

  {
    title: "Casablanca",
    year: 1942,
    director: "Michael Curtiz",
  },

  {
    title: "Interstellar",
    year: 2014,
    director: "Christopher Nolan",
  },

  {
    title: "The Greatest Showman",
    year: 2017,
    director: "Michael Gracey",
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Welcome to the myFlix API</h1>");
});

app.get("/movies", (req, res) => {
  res.json(topMovies);
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Ups! Something went wrong!");
});

app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
