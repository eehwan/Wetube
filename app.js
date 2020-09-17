import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookie_parser from "cookie-parser";
import body_parser from "body-parser";
import passport from "passport";
import session from "express-session";

import globalRouter from "./Routers/globalRouter";
import userRouter from "./Routers/userRouter";
import videoRouter from "./Routers/videoRouter";
import routes from "./routes";

import { localsMiddleware } from "./middlewares";
// for favicon
import favicon from "serve-favicon";
import path from "path";
const dir_favicon = "favicon";

import "./passport";

const app = express();
//middle ware
app.use(helmet({ contentSecurityPolicy: false }));
app.set("view engine", "pug");
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(cookie_parser());
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(favicon(path.join(dir_favicon, "favicon.ico")));
// login
app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(localsMiddleware);
// route
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
