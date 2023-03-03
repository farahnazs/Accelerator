require('dotenv').config();
const express = require("express");
// const userRouter = express.Router();
const cors = require('cors')
const jwt = require("jsonwebtoken");
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const taskRouter = require("./TaskRouter.js");
const profileRouter = require("./ProfileRouter.js");


app.use(express.json());
app.use(cors());
main().catch(err => console.log(err));
  
async function main() {
  await mongoose.connect(process.env.URL);
  console.log('db connected')
}

const users = [
  {
    id: "1",
    username: "admin",
    password: "admin123",
    role: "Admin",
  },
  {
    id: "2",
    username: "tagger",
    password: "tagger123",
    role: "Tagger",
  },
  {
    id: "3",
    username: "reviewer",
    password: "reviewer123",
    role: "Reviewer",
  },
  {
    id: "4",
    username: "manager",
    password: "manager123",
    role: "Manager",

  },
];

let refreshTokens = [];

app.post("/api/login", (req, res) => {
  console.log("req is:", req.body)
  let responseData = "not found";
  const bodyDetails = req.body;
  const foundUser = users.find(element => element.username === bodyDetails.username);
  if (foundUser === undefined) {
    responseData = "Username do not match"
  }
  else {
    if (foundUser.password === bodyDetails.password) {
      responseData = foundUser
    }
    else {
      responseData = "password do not match"
    }
  }
  res.status(200).json(
    responseData
  );
  console.log("user:", foundUser);

  //if everything is ok, create new access token, refresh token and send to user
});

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "mySecretKey", {
    expiresIn: "1m",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "myRefreshSecretKey");
};

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => {
    return u.username === username && u.password === password;
  });
  if (user) {
    //Generate an access token
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    refreshTokens.push(refreshToken);
    res.json({
      username: user.username,
      isAdmin: user.isAdmin,
      accessToken,
      refreshToken,
    });
  } else {
    res.status(400).json("Username or password incorrect!");
  }
});

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, "mySecretKey", (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid!");
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You are not authenticated!");
  }
};

app.delete("/api/users/:userId", verify, (req, res) => {
  if (req.user.id === req.params.userId || req.user.isAdmin) {
    res.status(200).json("User has been deleted.");
  } else {
    res.status(403).json("You are not allowed to delete this user!");
  }
});

app.post("/api/logout", verify, (req, res) => {
  const refreshToken = req.body.token;
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.status(200).json("You logged out successfully.");
});

app.use(taskRouter)

app.use(profileRouter)


app.listen(5000, () => {
  console.log('server started')
})