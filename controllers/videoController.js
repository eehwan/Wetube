import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";
// From globalRouter
export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 }).populate("creator");
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(`❌ ${error}`);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};
export const search = async (req, res) => {
  try {
    const {
      query: { term },
    } = req;
    const videos = await Video.find({
      title: { $regex: term, $options: "i" },
    })
      .limit(10)
      .populate("creator");
    res.render("search", { pageTitle: "Search", term, videos });
  } catch {
    res.render("search", { pageTitle: "Home", videos: [] });
  }
};

// From videoRouter
export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "Upload Video" });
};
export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { location },
    user,
  } = req;
  const newVideo = await Video.create({
    fileUrl: location,
    title,
    description,
    creator: user.id,
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  res.redirect(routes.videos + routes.videoDetail(newVideo.id));
};
export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id)
      .populate("creator")
      .populate("comments");
    res.render("videoDetail", { pageTitle: video.title, video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};
export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (req.user.id != video.creator) {
      throw Error();
    } else {
      res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    }
  } catch {
    res.redirect(routes.home);
  }
};
export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    const video = await Video.findById(id);
    if (req.user.id != video.creator) {
      throw Error();
    } else {
      await Video.findByIdAndUpdate(id, { title, description });
    }
    res.redirect(routes.videos + routes.videoDetail(id));
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};
export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (req.user.id != video.creator) {
      throw Error();
    }
    await Video.findOneAndRemove({ _id: id });
  } catch (error) {
    console.log(`❌ ${error}`);
  }
  res.redirect(routes.home);
};

// API
export const registerView = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};
export const addComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user,
  } = req;
  try {
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creatorId: user.id,
      creatorName: user.name,
    });
    video.comments.push(newComment._id);
    video.save();
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
};
