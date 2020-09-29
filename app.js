import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookie_parser from "cookie-parser";
import body_parser from "body-parser";
import compression from "compression";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";

import globalRouter from "./Routers/globalRouter";
import userRouter from "./Routers/userRouter";
import videoRouter from "./Routers/videoRouter";
import routes from "./routes";

import { localsMiddleware } from "./middlewares";
// for favicon
import serveFavicon from "serve-favicon";
import path from "path";
const dir_favicon = "favicon";

import "./passport";

const app = express();
const CookieStore = MongoStore(session);
//middle ware
app.use(helmet());
app.set("view engine", "pug");
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(cookie_parser());
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));
app.use(compression());
app.use(morgan("dev"));
app.use(serveFavicon(path.join(dir_favicon, "favicon.ico")));
// login
app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    store: new CookieStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(localsMiddleware);
// route
app.use(routes.videos, videoRouter);
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);

export default app;
