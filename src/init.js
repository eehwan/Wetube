import "@babel/polyfill";
import dotenv from "dotenv";
import "./db";
import app from "./app";

dotenv.config();
import "./models/Video";
import "./models/Comment";
import "./models/User";

const PORT = process.env.PORT;

const handleListening = () =>
  console.log(`✅ Listening on port: ${PORT} // ${new Date()}`);
app.listen(PORT, handleListening);
