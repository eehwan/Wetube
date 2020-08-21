// globalRouter
export const login = (req,res) => res.render("login", {pageTitle: "LogIn"});
export const logout = (req,res) => res.render("logout", {pageTitle: "LogOut"});
export const join = (req,res) => res.render("join", {pageTitle: "Join"});
// userRouter
export const users = (req,res) => res.render("users", {pageTitle: "Users"});
export const userDetail = (req,res) => res.render("userDetail", {pageTitle: "user Detail"});
export const editProfile = (req,res) => res.render("editProfile", {pageTitle: "edit Profile"});
export const changePassword = (req,res) => res.render("changePassword", {pageTitle: "change Password"});
