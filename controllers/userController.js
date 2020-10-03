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
    return res.render("404", {
      pageTitle: "Error",
      message: "Please verify your PASSWORD",
    });
  }
  try {
    // shoul add email authentication
    const newUser = User({
      name,
      email,
      loginType: "local",
    });
    await User.register(newUser, password[0]);
    next();
  } catch (error) {
    console.log(error);
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
      { email },
      {
        name,
        email,
        githubId: id,
        avatarUrl: avatar_url,
        loginType: "github",
      }
    );
    if (user) {
      return cb(null, user);
    } else {
      const newUser = await User.create({
        name,
        email,
        githubId: id,
        avatarUrl: avatar_url,
        loginType: "github",
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
    _json: { id, name, email },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      await User.findOneAndUpdate(
        { email },
        {
          name,
          email,
          facebookId: id,
          avatarUrl: `https://graph.facebook.com/${id}/picture?type=large`,
          loginType: "facebook",
        }
      );
      console.log(user);
      return cb(null, user);
    } else {
      const newUser = await User.create({
        name,
        email,
        facebookId: id,
        avatarUrl: `https://graph.facebook.com/${id}/picture?type=large`,
        loginType: "facebook",
      });
      console.log(newUser);
      return cb(null, newUser);
    }
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
    // const {
    //   _json: {
    //     id,
    //     properties: { nickname, profile_image },
    //   },
    // } = profile;
    console.log(id, nickname, profile_image);
    const user = await User.findOne({ id, loginType: "kakao" });
    if (user) {
      return done(null, user);
    } else {
      const newUser = await User.create({
        name: nickname,
        email: `kakao@${id}`,
        kakaoId: id,
        avatarUrl: profile_image,
        loginType: "kakao",
      });
      return done(null, newUser);
    }
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
    res.render("404", { pageTitle: "Error", error });
  }
};
export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "edit Profile", user: req.user });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "change Password" });
export const getMe = (req, res) => {
  res.render("userDetail", { pageTitle: "my Profile", user: req.user });
};
