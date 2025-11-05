import app from "./app.js";
import connectDB from "./db/index.js";
// const PORT = 8000;

connectDB()
  .then(() => {
    const server = app.listen(process.env.PORT, () => {
      console.log(
        "The application is currently running on port number",
        process.env.PORT
      );
    });
    server.on("error", (err) => {
      console.log("Error in the server", err);
    });
  })
  .catch((err) => {
    console.log("Error in the server: ", err);
  });
