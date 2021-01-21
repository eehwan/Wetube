import routes from "./routes";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import multer from "multer";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
});
const multerVideo = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "wetube-eehwan/video",
  }),
});
const multerAvatar = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "wetube-eehwan/avatar",
  }),
});
// const uploadDir = "uploads/";
// const multerVideo = multer({ dest: `${uploadDir}videos/` });
// const multerAvatar = multer({ dest: `${uploadDir}avatars/` });

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
