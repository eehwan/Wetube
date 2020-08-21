import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookie_parser from "cookie-parser";
import body_parser from "body-parser";
import { userRouter } from "./Router/user";

const app = express();

// handle function
const handleHome = (req, res) => res.send("Hello from Home!");
const handleProfile = (req, res) => res.send("You are on my profile");

//middle ware
app.use(cookie_parser());
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: true}));
app.use(helmet())
app.use(between);
app.use(morgan("combined"));

// route
app.get("/", handleHome);
app.get("/profile", handleProfile);
app.use("/user", userRouter);

export default app;
