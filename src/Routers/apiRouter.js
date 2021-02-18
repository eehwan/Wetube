import express from "express";
import routes from "../routes";
import {
  registerView,
  addComment,
  deleteComment,
} from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, registerView);
apiRouter.use(routes.deleteComment(), deleteComment);
apiRouter.post(routes.addComment, addComment);

export default apiRouter;
