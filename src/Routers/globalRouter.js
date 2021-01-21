import express from "express";
import passport from "passport";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import {
  getLogin,
  postLogin,
  logout,
  getJoin,
  postJoin,
  githubLogin,
  facebookLogin,
  kakaoLogin,
  postAuthLogin,
} from "../controllers/userController";
import { onlyPublic, onlyPrivate } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get("", home);
globalRouter.get(routes.search, search);
globalRouter
  .route(routes.join)
  .get(onlyPublic, getJoin)
  .post(onlyPublic, postJoin, postLogin);
globalRouter
  .route(routes.login)
  .get(onlyPublic, getLogin)
  .post(onlyPublic, postLogin);
globalRouter.get(routes.github, onlyPublic, githubLogin);
globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", { failureRedirect: routes.login }),
  postAuthLogin
);
globalRouter.get(routes.facebook, onlyPublic, facebookLogin);
globalRouter.get(
  routes.facebookCallback,
  passport.authenticate("facebook", { failureRedirect: routes.login }),
  postAuthLogin
);
globalRouter.get(routes.kakao, onlyPublic, kakaoLogin);
globalRouter.get(
  routes.kakaoCallback,
  passport.authenticate("kakao", { failureRedirect: routes.login }),
  postAuthLogin
);
globalRouter.get(routes.logout, onlyPrivate, logout);

export default globalRouter;
