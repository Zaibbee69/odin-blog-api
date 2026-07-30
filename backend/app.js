const path = require("node:path")
const express = require('express');
const authenticate = require("./middlewares/authenticate")
const requireAuthor = require("./middlewares/requireAuthor")
const { Prisma } = require('./generated/prisma');
const cors = require("cors");

// Routers
const authRouter = require("./routes/authRoutes")
const postRouter = require("./routes/postRoutes")
const commentRouter = require("./routes/commentRoutes")

// App Setup
const app = express();
const PORT = 3000;
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Cors Setup
app.use(
    cors({
        origin: "http://localhost:5173",
    })
);
// Routes
app.use("/auth", authRouter);
app.use("/posts", postRouter)
app.use("/comments", authenticate, commentRouter)

// --- GLOBAL ERROR HANDLER ---

app.use((err, req, res, next) => {
    // 1. Always log the full stack trace for debugging
    console.error('❌ Error caught by global handler:', err.stack);

    // 2. Check if the error is an instance of Prisma's Known Request Errors
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
            case 'P2025': // Record not found
                return res.status(404).json({
                    error: 'Not Found',
                    message: err.meta?.cause || 'The requested record was not found.'
                });

            case 'P2002': // Unique constraint violation (e.g., duplicate email)
                return res.status(409).json({
                    error: 'Conflict',
                    message: `Unique constraint failed on the fields: ${err.meta?.target}`
                });

            case 'P2003': // Foreign key constraint violation (e.g., user doesn't exist)
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'Foreign key constraint failed on the database.'
                });

            default:
                // Other Prisma specific codes
                return res.status(400).json({
                    error: 'Database Error',
                    message: `Prisma error code: ${err.code}`
                });
        }
    }

    // 3. Fallback for all other native JavaScript or runtime errors
    return res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});