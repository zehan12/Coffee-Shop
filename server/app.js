const express = require("express");
const app = express();
const port = 3000;
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDatabase = require("./config/database.js");

const User = require("./model/user");

const authRoute = require("./routs/auth.js");
const cartRouter = require("./routs/cart.js");

// connect to database
connectDatabase();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const corsOptions = {
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*',cors());
var allowCrossDomain = function(req,res,next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();  
}
app.use(allowCrossDomain);

app.use(cookieParser("secretcode"));

const sessionOption = {
  secret: "keyboard cat",
  resave: true,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 3,
    maxAge: 1000 * 60 * 60 * 24 * 3,
    httpOnly: true,
  },
};

app.use(session(sessionOption));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log(req.method, req.url,req.session);
  next();
});

app.use("/auth", authRoute);
app.use("/cart", cartRouter);

app.listen(port, () => {
  console.log(`Port ${port} is Listening`);
});
