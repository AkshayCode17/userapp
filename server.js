const express = require("express");
const db = require("./db");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes")
const authMiddleware = require("./middleware/auth.middleware");
const setupSocketIO = require("./socket");
const http = require("http");


const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/auth", authRoutes)

app.use("/users", authMiddleware, userRoutes)

app.get("/", (req, res) => {
    res.status(200).json({ msg: "Server is Healthy" })
})

const io = setupSocketIO(server);

server.listen(PORT, async () => {
    try {
        await db
        console.log("Db Connected")
    } catch (error) {
        console.log("db not connected")
    }
    console.log(`server is running at port ${PORT}`)
})