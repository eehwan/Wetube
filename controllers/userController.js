import routes from "../routes";
import User from "../models/User";
import passport from "passport";

// From globalRouter
export const getLogin = (req, res) => {
  res.render("login", {
    pageTitle: "LogIn",
  });
};
export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});
export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};
export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password },
  } = req;
  console.log(`❕ ${name}, ${email}, ${password} ❕`);
  if (password[0] != password[1]) {
    res.status(400);
    res.render("join", {
      pageTitle: "Join",
      name,
      email,
      password: password[0],
    });
  } else {
    try {
      const newUser = await User({
        name,
        email,
      });
      await User.register(newUser, password[0]);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};
export const githubLogin = () => passport.authenticate("github");
export const postGithubLogin = (req, res) => res.send(routes.home);
export const githubLoginCallback = (accessToken, refreshToken, profile, cb) => {
  console.log(accessToken, refreshToken, profile, cb);
};
export const logout = (req, res) => {
  // todo: logout process
  // req.session.destroy((error) => console.log(error));
  req.logout();
  res.redirect(routes.home);
};
// From userRouter
export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "user Detail" });
export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "edit Profile" });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "change Password" });
