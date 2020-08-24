import { videos } from "../db"
// globalRouter
export const home = (req,res) => res.render("home", {pageTitle: "Home", videos});
export const search = (req,res) => {
  const {
    query: { term }
  } = req
  res.render("search", {pageTitle: "Search", term, videos})
};
// videoRouter
export const upload = (req,res) => {res.render("upload", {pageTitle: "Upload Video"});}
export const videoDetail = (req,res) => {
  const {
    params: {id}
  } = req
  res.render("videoDetail", {pageTitle: "video Detail", id})
}
export const editVideo = (req,res) => res.render("editVideo", {pageTitle: "edit Video"});
export const deleteVideo = (req,res) => res.render("deleteVideo", {pageTitle: "delete Video"});
