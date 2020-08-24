import routes from "./routes"

export const globalVariables = (req,res,next) =>{
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: true,
    id: "Shin"
  }
  next()
}
