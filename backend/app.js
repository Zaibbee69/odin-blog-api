const path = require("node:path")
const express = require('express');
const passport = require("passport");
// const session = require("express-session");

// Routers
const authRouter = require("./routes/authRoutes")

// App Setup
const app = express();
const PORT = 3000;
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Add the user object to res.locals so that it can be accessed in all views
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

// Routes
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.use("/auth", authRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});