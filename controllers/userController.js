import routes from "../routes"
// globalRouter
export const getLogin = (req,res) => res.render("login", {pageTitle: "LogIn"});
export const postLogin = (req,res) => {
  const{
    body: {email,password}
  } = req;
  console.log(`❕ ${email}, ${password} ❕`)
  // todo : confirm data from db
  if (true){
    res.redirect(routes.home);
  }else{
    res.status(400)
  }
}
export const logout = (req,res) => {
  // todo: logout process
  res.redirect(routes.home);
}
export const getJoin = (req,res) => res.render("join", {pageTitle: "Join"});
export const postJoin = (req,res) => {
  const{
    body:{name, email, password}
  } = req
  console.log(`❕ ${name}, ${email}, ${password} ❕`)
  if (password[0]!=password[1]){
    res.status(400)
    res.render("join", {pageTitle: "Join", name, email, password: password[0]});
  }
  else{
    // to do : Register user, let user logIn
    res.redirect(routes.home)
  }
}
// userRouter
export const userDetail = (req,res) => res.render("userDetail", {pageTitle: "user Detail"});
export const editProfile = (req,res) => res.render("editProfile", {pageTitle: "edit Profile"});
export const changePassword = (req,res) => res.render("changePassword", {pageTitle: "change Password"});
