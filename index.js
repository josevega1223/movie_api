const express = require("express"),
  app = express(),
  morgan = require("morgan"),
  fs = require("fs"),
  path = require("path"),
  uuid = require("uuid"),
  bodyParser = require("body-parser");

app.use(bodyParser.json());

let users = [
  {
    id: 1,
    name: "John",
    favouriteMovie: ["The Lord of the Rings"],
  },
  {
    id: 2,
    name: "Sarah",
    favouriteMovie: ["Pride & Prejudice"],
  },
];

let topMovies = [
  {
    title: "Gladiator",
    year: 2000,
    genre: {
      name: "Action Drama",
    },
    director: "Ridley Scott",
  },

  {
    title: "Troy",
    year: 2004,
    genre: {
      name: "Drama History",
    },
    director: "Wolfgang Petersen",
  },

  {
    title: "Braveheart",
    year: 1995,
    genre: {
      name: "Drama History",
    },
    director: "Mel Gibson",
  },

  {
    title: "Birdman",
    year: 2014,
    genre: {
      name: "Comedy Drama",
    },
    director: "Alejandro Gonzalez Iñarritu",
  },

  {
    title: "Hercules",
    year: 1997,
    genre: {
      name: "Animation",
    },
    director: "Ron Clements & John Musker",
  },

  {
    title: "Star Wars V: Empire Strikes Back",
    year: 1980,
    genre: {
      name: "Sci-Fi Adventure",
    },
    director: "Irvin Kershner",
  },

  {
    title: "Captain America: The First Avenger",
    year: 2011,
    genre: {
      name: "Sci-Fi Action",
    },
    director: "Joe Johnston",
  },

  {
    title: "Casablanca",
    year: 1942,
    genre: {
      name: "Drama",
    },
    director: "Michael Curtiz",
  },

  {
    title: "Interstellar",
    year: 2014,
    genre: {
      name: "Sci-Fi Adventure",
    },
    director: "Christopher Nolan",
  },

  {
    title: "The Greatest Showman",
    year: 2017,
    genre: {
      name: "Musical",
    },
    director: "Michael Gracey",
  },
];

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send("No such user");
  }
});

app.post("/users", (req, res) => {
  const newUser = req.body;
  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).send("Users need name");
  }
});

app.post("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favouriteMovie.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);
  } else {
    res.status(400).send("No such user");
  }
});

app.delete("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favouriteMovie = user.favouriteMovie.filter(
      (title) => title !== movieTitle
    );
    res
      .status(200)
      .send(`${movieTitle} has been removed from user ${id}'s array`);
  } else {
    res.status(400).send("No such user");
  }
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    users = users.filter((user) => user.id != id);
    res.status(200).send(`User ${id} has been deleted`);
  } else {
    res.status(400).send("No such user");
  }
});

app.get("/movies", (req, res) => {
  res.status(200).json(movies);
});

app.get("/movies/:title", (req, res) => {
  const { title } = req.params;
  const movie = movies.find((movie) => movie.title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send("No such movie");
  }
});

app.get("/movies/genre/:genreName", (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find((movie) => movie.genre.name === genreName).genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send("No such genre");
  }
});

app.get("/movies/directors/:directorName", (req, res) => {
  const { directorName } = req.params;
  const director = movies.find(
    (movie) => movie.director === directorName
  ).director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send("No such genre");
  }
});

const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
  flags: "a",
});
app.use(morgan("combined", { stream: accessLogStream }));

app.get("/", (req, res) => {
  res.send("Welcome to my movie website!");
});

app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

app.use(express.static("public"));

app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Ups! Something broke!");
});
