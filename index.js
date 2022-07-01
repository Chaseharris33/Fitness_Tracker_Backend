// create the express server here
const express = require("express");
const client = require("./db/client")

const PORT = process.env.PORT || 3000
const server = express()

const cors = require("cors");


const morgan = require("morgan");
server.use(morgan("dev"));

server.use(cors());
server.use(express.json()) 
server.use("/api", require("./api"))

// server.use("*", (req, res, next) => {
//     res.status(404).send("Not Found")
// })

// server.use((err, req, res, next) => {
//     console.log(err)
//     res.status(500).send(err)
// })


server.listen(PORT, ()=>{
    console.log("Server is up and running!")
    client.connect()
})