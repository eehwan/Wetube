import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookie_parser from "cookie-parser";
import body_parser from "body-parser";

import globalRouter from "./Routers/globalRouter";
import userRouter from "./Routers/userRouter";
import videoRouter from "./Routers/videoRouter";
import routes from "./routes";

import { globalVariables } from "./globalVariables"
// for favicon
import favicon from "serve-favicon";
const dir_favicon = "favicon";
import path from "path";

const app = express();
//middle ware
app.use(helmet());
app.use(favicon(path.join(dir_favicon, 'favicon.ico')))
app.set('view engine', "pug")
app.use(cookie_parser());
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: true}));
app.use(morgan("combined"));

app.use(globalVariables)
// route
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
