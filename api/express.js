const express = require("express");
const app = express();
const cors = require("cors");
const User = require("./models/User");
const { default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");
const path = require("path");
const Post = require("./models/Post");

app.use(cors({ credentials: true, origin: "http://localhost:4040" }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const secretToken = "jkdnonenrjnenroieern";

mongoose.connect(
  "mongodb://allialameen8739:zzZcITrGkRdV6YwM@ac-kavuqoc-shard-00-00.hnsov1d.mongodb.net:27017,ac-kavuqoc-shard-00-01.hnsov1d.mongodb.net:27017,ac-kavuqoc-shard-00-02.hnsov1d.mongodb.net:27017/?ssl=true&replicaSet=atlas-8cpki0-shard-0&authSource=admin&retryWrites=true&w=majority"
);

// This route handles the registration process by extracting the username and password from the request body.
// It then creates a new user with the hashed password using bcrypt and saves it to the database using the User.create() method.
// If successful, it sends a JSON response with the new user details, otherwise it sends a 400 error response.

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const UserDetails = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(UserDetails);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

// It checks the username and password sent in the request body
// against the stored user credentials in the database.
// If the password matches, it returns a response indicating a successful login.

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const UserDetails = await User.findOne({ username });
  const passWordOk = bcrypt.compareSync(password, UserDetails.password);

  if (passWordOk) {
    jwt.sign(
      { username, id: UserDetails._id },
      secretToken,
      {},
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json({
          id: UserDetails._id,
          username,
        });
      }
    );
  } else {
    res.status(400).json("Wrong credentials!");
  }
});

// it sends a JSON response with the decoded token information in the info object.
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secretToken, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

// logout endpoint clears the token cookie by setting its value to an empty string
app.post("/logout", (req, res) => {
  res.cookie("token", "").json("token cleared");
});

// This is an Express.js route handler for creating a new blog post. It uses the uploadMiddleware middleware to handle file uploads, renames the uploaded file, and then creates a new Post object with the provided title, summary, content, and image path. Finally, it sends a JSON response with the created postContent.
app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, secretToken, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const postContent = await Post.create({
      title,
      summary,
      content,
      image: newPath,
      author: info.id,
    });
    res.json(postContent);
  });
});

app.put("/post", uploadMiddleware.single("file"), async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  jwt.verify(token, secretToken, {}, async (err, info) => {

    if (err) throw err;
    const { id, title, summary, content } = req.body;
    const postContent = await Post.findById(id);
    const isAuthor = JSON.stringify(postContent.author) === JSON.stringify(info.id)
    // res.json({postContent, info, isAuthor});

    if (!isAuthor) {
      return res.status(400).json('You are not the author')
    }

    await postContent.update({
      title,
      summary,
      content,
      image: newPath ? newPath : postContent.image
    });

    res.json(postContent);
  });
});

app.get("/post", async (req, res) => {
  const posts = await Post.find()
    .populate("author", ["username"])
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(posts);
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postContent = await Post.findById(id).populate("author", ["username"]);
  res.json(postContent);
});

const PORT = 4040;
app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`);
});

// mongodb://allialameen8739:zzZcITrGkRdV6YwM@ac-kavuqoc-shard-00-00.hnsov1d.mongodb.net:27017,ac-kavuqoc-shard-00-01.hnsov1d.mongodb.net:27017,ac-kavuqoc-shard-00-02.hnsov1d.mongodb.net:27017/?ssl=true&replicaSet=atlas-8cpki0-shard-0&authSource=admin&retryWrites=true&w=majority
// zzZcITrGkRdV6YwM
