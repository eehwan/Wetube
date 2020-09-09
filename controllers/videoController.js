import routes from "../routes"
import Video from "../models/Video"
// globalRouter
export const home = async(req,res) => {
  try{
    const videos = await Video.find({});
    res.render("home", {pageTitle: "Home", videos});
  } catch(error){
    console.log(`❌ ${error}`)
    res.render("home", {pageTitle: "Home", videos: [] });
  }
}
export const search = (req,res) => {
  const {
    query: { term }
  } = req
  res.render("search", {pageTitle: "Search", term, videos})
};
// videoRouter
export const getUpload = (req,res) => {res.render("upload", {pageTitle: "Upload Video"});}
export const postUpload = async(req,res) =>{
  const {
    body: { title, description},
    file: { path }
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description
  });
  // To do: upload and save video
  // res.render("video,{pageTitle: "postUpload Video", file, title, description});
  res.redirect(routes.videos + routes.videoDetail(newVideo.id));
}
export const videoDetail = (req,res) => {
  const {
    params: {id}
  } = req
  res.render("videoDetail", {pageTitle: "video Detail", id})
}
export const editVideo = (req,res) => res.render("editVideo", {pageTitle: "edit Video"});
export const deleteVideo = (req,res) => res.render("deleteVideo", {pageTitle: "delete Video"});
