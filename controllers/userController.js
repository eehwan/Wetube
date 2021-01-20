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
    body: { name, email, password, password2 },
  } = req;
  // console.log(`❕ ${name}, ${email}, ${password} ❕`);
  if (password != password2) {
    res.status(400);
    return res.render("404", {
      pageTitle: "Error",
      message: "Please verify your PASSWORD",
    });
  }
  try {
    // To do : should add email authentication
    const newUser = User({
      name,
      email,
      loginType: "local",
    });
    await User.register(newUser, password);
    next();
  } catch (error) {
    console.log(error);
    res.status(400);
    res.render("404", { pageTitle: "Error", error });
  }
};
export const githubLogin = passport.authenticate("github");
export const facebookLogin = passport.authenticate("facebook");
export const kakaoLogin = passport.authenticate("kakao");
export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, avatar_url, name, email },
  } = profile;
  try {
    const user = await User.findOneAndUpdate(
      { githubId: id },
      {
        name,
        email,
        githubId: id,
        avatarUrl: avatar_url,
        loginType: "github",
      },
      { upsert: true }
    );
    return cb(null, user);
  } catch (error) {
    return cb(error);
  }
};
export const facebookLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, name, email },
  } = profile;
  try {
    const user = await User.findOneAndUpdate(
      { facebookId: id },
      {
        name,
        email,
        facebookId: id,
        avatarUrl: `https://graph.facebook.com/${id}/picture?type=large`,
        loginType: "facebook",
      },
      { upsert: true }
    );
    return cb(null, user);
  } catch (error) {
    console.log(error);
    return cb(error);
  }
};
export const kakaoLoginCallback = async (_, __, profile, done) => {
  try {
    const id = profile._json.id;
    const nickname = profile._json.properties.nickname;
    const profile_image = profile._json.properties.profile_image;
    console.log(id, nickname, profile_image);
    const user = await User.findOneAndUpdate(
      { kakaoId: id },
      {
        name: nickname,
        email: `${id}@kakao`,
        kakaoId: id,
        avatarUrl: profile_image,
        loginType: "kakao",
      },
      { upsert: true }
    );
    return done(null, user);
  } catch (error) {
    console.log("error");
    return done(error);
  }
};
export const postAuthLogin = (req, res) => res.redirect(routes.home);
export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

// From userRouter //

export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findOne({ _id: id }).populate("videos");
    res.render("userDetail", { pageTitle: "user Detail", user });
  } catch (error) {
    console.log(error);
    res.status(400);
    res.render("404", { pageTitle: "Error", error });
  }
};
export const getMe = (req, res) => {
  res.render("userDetail", { pageTitle: "my Profile", user: req.user });
};
export const getEditProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "edit Profile" });
export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file,
  } = req;
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.location : req.user.avatarUrl,
    });
    res.redirect(routes.users + routes.me);
  } catch (error) {
    res.render("editProfile", { pageTitle: "edit Profile" });
  }
};
export const getChangePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "change Password" });
export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 },
  } = req;
  try {
    if (newPassword !== newPassword1) {
      res.status(400);
      return res.render("404", {
        pageTitle: "Error",
        error: "Please verify your newPassword",
      });
    }
    await req.user.changePassword(oldPassword, newPassword);
    res.redirect(routes.users + routes.me);
  } catch (error) {
    res.status(400);
    res.render("404", { pageTitle: "Error", error });
  }
};
