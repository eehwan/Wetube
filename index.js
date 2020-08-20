import express from "express";
const app = express();
const port_num = 5006;

// handle function
const handleHome = (req, res) => res.send("Hello from Home!");
const handleProfile = (req, res) => res.send("You are on my profile");
const handleListening = () =>
  console.log(`Listening on port: ${port_num}`);


app.get("/", handleHome);
app.get("/profile", handleProfile);

// port
app.listen(port_num, handleListening);
