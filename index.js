require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const auth = require("./middleware/auth");
const db = require("./data");

// allow CORS from the client app
const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

app.locals.error = (status, message) => {
  const err = new Error(message);
  err.status = status;
  throw err;
};

// Add JSON-parsing middleware for request bodies
app.use(express.json());

// If a delay is specified, wire up the timeout
const delay = +process.env.SIMULATE_LATENCY;
if (delay > 0) {
  app.use((req, res, next) => {
    setTimeout(next, delay);
  });
}

app.use((req, res, next) => {
  res.locals.db = db.data;
  next();
});

app.get("/", (req, res) => {
  res.send({ message: "Hello world" });
});

app.use("/auth", require("./controllers/auth"));

// Same mount point as rest of /users endpoints, but (by definition) no auth
// check on new user registration, which is all this controller defines.
app.use("/users", require("./controllers/register"));

app.use(
  "/users",
  auth.jwtCheck,
  auth.userLookup,
  require("./controllers/users")
);

app.use(
  "/objects",
  auth.jwtCheck,
  auth.userLookup,
  require("./controllers/objects")
);

app.all("*", (req, res) => {
  req.app.locals.error(404, `No route matches ${req.method} ${req.path}.`);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({ error: err.message || "Server error." });
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}...`);
});
