import app from "./app.js";
import connectDb from "./db/index.js";
// const PORT = 8000;

connectDb().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(
      `The application is running on port number ${process.env.PORT}`
    );
  });
});
