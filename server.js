const express = require("express");
const mongoose = require("mongoose");

const app = express();
const authRoutes = require("./routes/authRoutes");
const { requireAuth,checkUser } = require("./middleware/authMiddleware");
const cookieParser = require("cookie-parser");
// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
// view engine
app.set("view engine", "ejs");

// database connection
const dbURI =
  " mongodb+srv://sumit:sumit123@nodetuts.egcdbe9.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => console.log("Connected"))
  .catch((err) => console.log(err));
app.listen(3400);
// routes
app.get('*',checkUser);
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", requireAuth, (req, res) => res.render("smoothies"));
app.use(authRoutes);
