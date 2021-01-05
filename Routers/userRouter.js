import express from "express";
import routes from "../routes";
import {
  userDetail,
  getEditProfile,
  postEditProfile,
  getChangePassword,
  postChangePassword,
  getMe,
} from "../controllers/userController";
import { onlyPrivate, uploadAvatar } from "../middlewares";

const userRouter = express.Router();

userRouter
  .route(routes.editProfile)
  .get(onlyPrivate, getEditProfile)
  .post(onlyPrivate, uploadAvatar, postEditProfile);
userRouter
  .route(routes.changePassword)
  .get(onlyPrivate, getChangePassword)
  .post(onlyPrivate, postChangePassword);
userRouter.get(routes.me, onlyPrivate, getMe);
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;
