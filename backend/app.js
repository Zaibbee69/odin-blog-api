const path = require("node:path")
const express = require('express');
const authenticate = require("./middlewares/authenticate")
const requireAuthor = require("./middlewares/requireAuthor")

// Routers
const authRouter = require("./routes/authRoutes")
const postRouter = require("./routes/postRoutes")
const commentRouter = require("./routes/commentRoutes")

// App Setup
const app = express();
const PORT = 3000;
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/auth", authRouter);
app.use("/posts", authenticate, postRouter)
app.use("/comments", authenticate, commentRouter)

// --- GLOBAL ERROR HANDLER ---
app.use((err, req, res, next) => {
    console.error('❌ Error caught by global handler:', err.stack);

    res.status(500).json({ error: 'Internal Server Error' });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});