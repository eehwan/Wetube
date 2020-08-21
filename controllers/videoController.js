// globalRouter
export const home = (req,res) => res.render("home", {pageTitle: "Home"});
export const search = (req,res) => {
  const {
    query: { term }
  } = req
  res.render("search", {pageTitle: "Search", term})
};
// videoRouter
export const videos = (req,res) => res.render("videos", {pageTitle: "Videos"});
export const upload = (req,res) => res.render("upload", {pageTitle: "Upload Video"});
export const videoDetail = (req,res) => res.render("videoDetail", {pageTitle: "video Detail"});
export const editVideo = (req,res) => res.render("editVideo", {pageTitle: "edit Video"});
export const deleteVideo = (req,res) => res.render("deleteVideo", {pageTitle: "delete Video"});
