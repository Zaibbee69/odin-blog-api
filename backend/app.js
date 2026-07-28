const path = require("node:path")
const express = require('express');

// Routers
const authRouter = require("./routes/authRoutes")

// App Setup
const app = express();
const PORT = 3000;
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.use("/auth", authRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});