import app from "./app";

const PORT = 5006;

const handleListening = () =>
  console.log(`✅ Listening on port: ${PORT}`);

app.listen(PORT, handleListening);
