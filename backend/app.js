const path = require("node:path")
const express = require('express');
const authenticate = require("./middlewares/authenticate")
const requireAuthor = require("./middlewares/requireAuthor")

// Routers
const authRouter = require("./routes/authRoutes")
const postRouter = require("./routes/postRoutes")

// App Setup
const app = express();
const PORT = 3000;
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get('/', authenticate, (req, res) => {
    res.send('Hello, World!');
});
app.use("/auth", authRouter);
app.use("/posts", postRouter)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});