const express = require("express");
const db = require("./db");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes")
const authMiddleware = require("./middleware/auth.middleware");

const http = require("http");
const { Server } = require("socket.io");

const app = express();
// const server = http.createServer(app);
// const io = new Server(server);

const PORT = process.env.PORT || 5000;
app.use(express.json());

// io.use((socket, next) => {
//     const token = socket.handshake.auth.token;
//     if (!token) {
//         return next(new Error("Authentication required"));
//     }
//     try {
//         const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
//         socket.user = user;
//         next();
//     } catch (err) {
//         next(new Error("Invalid or expired token"));
//     }
// });


app.use("/auth", authRoutes)

app.use("/users", authMiddleware, userRoutes)

app.get("/", (req, res) => {
    res.status(200).json({ msg: "Server is Healthy" })
})

app.listen(PORT, async () => {
    try {
        await db
        console.log("Db Connected")
    } catch (error) {
        console.log("db not connected")
    }
    console.log(`server is running at port ${PORT}`)
})