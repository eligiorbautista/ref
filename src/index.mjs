import express from "express";
import router from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
const app = express();

app.use(cookieParser("helloworld")); /* secret */
app.use(
  session({
    secret: "secretpassword1234",
    saveUninitialized: false, // save the session before the request is executed
    resave: false, // save the session before saving the cookie in the session object and the session object will be automatically saved after the request is executed
    cookie: {
      maxAge: 60000 * 60, 
    },
  })
);
app.use(express.json());

const loggingMiddleware = (req, res, next) => {
  console.log(`Finished Logging...`);
  next();
};

app.use(loggingMiddleware);

app.use(router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
