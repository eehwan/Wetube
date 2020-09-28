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
  // console.log(`❕ ${name}, ${email}, ${password} ❕`);
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
export const githubLogin = passport.authenticate("github");
export const facebookLogin = passport.authenticate("facebook");
export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, avatar_url, name, email },
  } = profile;
  try {
    const user = await User.findOne({ name, email });
    if (user) {
      user.githubId = id;
      user.avatarUrl = avatar_url;
      user.save();
      return cb(null, user);
    } else {
      const newUser = await User.create({
        name,
        email,
        githubId: id,
        avatarUrl: avatar_url,
      });
      console.log(user);
      return cb(null, newUser);
    }
  } catch (error) {
    return cb(error);
  }
};
export const facebookLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, picture, name, email },
  } = profile;
  console.log(profile);
  console.log(picture, picture.data.url);
  try {
    const user = await User.findOne({ name, email });
    if (user) {
      user.facebookId = id;
      user.avatarUrl = picture.data.url;
      user.save();
      return cb(null, user);
    } else {
      const newUser = await User.create({
        name,
        email,
        facebookId: id,
        avatarUrl: picture.data.url,
      });
      return cb(null, newUser);
    }
  } catch (error) {
    console.log(error);
    return cb(error);
  }
};
export const postAuthLogin = (req, res) => res.redirect(routes.home);
export const logout = (req, res) => {
  // todo: logout process
  // req.session.destroy((error) => console.log(error));
  req.logout();
  res.redirect(routes.home);
};

// From userRouter
export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findOne({ _id: id });
    res.render("userDetail", { pageTitle: "user Detail", user });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};
export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "edit Profile" });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "change Password" });
export const getMe = (req, res) => {
  res.render("userDetail", { pageTitle: "my Profile", user: req.user });
};
