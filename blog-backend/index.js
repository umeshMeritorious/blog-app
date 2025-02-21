const express = require("express");
const { default: mongoose, Schema } = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb+srv://root:password123456@cluster0.zajbo.mongodb.net/")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const Users = mongoose.model("User", userSchema);

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  posted_by: { type: mongoose.Types.ObjectId, ref: "User" },
});

const Post = mongoose.model("Post", postSchema);

const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access Denied" });

  jwt.verify(token.split(" ")[1], "blog-practical", (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid Token" });
    req.user = user;
    next();
  });
};

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({
      username: username,
    });
    if (!user._id) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    if (user.password === password) {
      const token = jwt.sign({ user }, "blog-practical", {
        expiresIn: "1h",
      });
      res.json({ token: token, user: user });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/", (request, response) => {
  response.send("Welcome!!");
});

app.use(authenticateJWT);

app.get("/posts", async (req, res) => {
  try {
    let { page, limit } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find().skip(skip).limit(limit);
    const totalPosts = await Post.countDocuments();

    res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
      totalPosts,
      posts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/post/create", async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/post/get/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/post/update/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/post/delete/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || "127.0.0.1";
app.listen(PORT, HOST, () => {
  console.log("Server running on", `${HOST + ":" + PORT}`);
});
