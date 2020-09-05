import { videos } from "../db"
import { routes } from "../routes"
// globalRouter
export const home = (req,res) => res.render("home", {pageTitle: "Home", videos});
export const search = (req,res) => {
  const {
    query: { term }
  } = req
  res.render("search", {pageTitle: "Search", term, videos})
};
// videoRouter
export const getUpload = (req,res) => {res.render("upload", {pageTitle: "Upload Video"});}
export const postUpload = (req,res) =>{
  const {
    body: {file, title, description}
  } = req;
  // To do: upload and save video
  // res.render("video,{pageTitle: "postUpload Video", file, title, description});
  res.redirect(routes.videoDetail(324393));
}
export const videoDetail = (req,res) => {
  const {
    params: {id}
  } = req
  res.render("videoDetail", {pageTitle: "video Detail", id})
}
export const editVideo = (req,res) => res.render("editVideo", {pageTitle: "edit Video"});
export const deleteVideo = (req,res) => res.render("deleteVideo", {pageTitle: "delete Video"});
