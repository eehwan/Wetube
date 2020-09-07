import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useFindAndModify: false
  }
);

const db = mongoose.connection;
const handleOpen = () => console.log("✅ Connected to DB")
const handleError = () => console.log("❌ Error on DB")

db.once("open", handleOpen);
db.on("error", handleError);
// export const videos = [
//   {
//     id: 324393,
//     title: "big_buck_bunny",
//     description: "This is something I love",
//     views: 123,
//     videoFile:
//       "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
//     creator: {
//       id: 121212,
//       name: "Nicolas",
//       email: "nico@las.com"
//     }
//   },
//   {
//     id: 1212121,
//     title: "big_buck_bunny",
//     description: "This is something I love",
//     views: 211,
//     videoFile:
//       "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
//     creator: {
//       id: 121212,
//       name: "Nicolas",
//       email: "nico@las.com"
//     }
//   },
//   {
//     id: 55555,
//     title: "big_buck_bunny",
//     description: "This is something I love",
//     views: 322,
//     videoFile: "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
//     creator: {
//       id: 121212,
//       name: "Nicolas",
//       email: "nico@las.com"
//     }
//   },
//   {
//     id: 11111,
//     title: "big_buck_bunny",
//     description: "This is something I love",
//     views: 64,
//     videoFile:
//       "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
//     creator: {
//       id: 121212,
//       name: "Nicolas",
//       email: "nico@las.com"
//     }
//   }
// ];
