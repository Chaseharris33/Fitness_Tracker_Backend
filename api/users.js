const express = require("express");
const userRouter = express.Router();

const jwt = require("jsonwebtoken");
const { JWT_SECRET = "neverTell" } = process.env;

const {
  createUser,
  getUserByUsername,
  getUser,
  getPublicRoutinesByUser
} = require("../db");


userRouter.post("/register", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await getUserByUsername(username);

    if (user) {
      next({
        name: "UserError",
        message: "Username already exists",
      });
    } else if (password.length < 8) {
      next({
        name: "PasswordError",
        message: "Password must contain at least 8 characters",
      });
    } else {
      const user = await createUser({ username, password });
      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: "1w" }
      );
      res.send({ user, token, message: "You're logged in" });
    }
  } catch (error) {
    next(error);
  }
});

userRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      next({
        message: "Incorrect username or password",
      });
    } else {
      const user = await getUser({ username, password });
      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: "1w" }
      );
      res.send({ user, token, message: "You're logged in" });
    }
  } catch (error) {
    next(error);
  }
});

userRouter.get("/me", async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    next(error);
  }
});

userRouter.get("/:username/routines", async (req, res, next) => {
  const { username } = req.params;

  try {
    const routines = await getPublicRoutinesByUser({ username });
    res.send(routines);
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter