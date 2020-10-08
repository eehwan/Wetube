import routes from "./routes";
import multer from "multer";

const uploadDir = "uploads/";
const multerVideo = multer({ dest: `${uploadDir}videos/` });
const multerAvatar = multer({ dest: `${uploadDir}avatars/` });

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  console.log(req.user);
  next();
};
export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};
export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.render("404", { pageTitle: "Erorr", message: "Please Login" });
  }
};

export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");
