var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const ejs = require("ejs");
const { home } = require("nodemon/lib/utils");
const nodemailer = require("nodemailer");

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mongoose.connect(
  "mongodb+srv://yno18:Sadhna@123@cluster0.dxqtb.mongodb.net/llyno?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const nameSchema = {
  name: String,
  mobile: Number,
};

const name = mongoose.model("name", nameSchema);

var db = mongoose.connection;

db.on("error", () => console.log("Error in Connecting to Database"));
db.once("open", () => console.log("Connected to Database"));

app.post("/contact-success", (req, res) => {
  // var email = req.body.email;
  var name = req.body.name;
  var pass = req.body.pass;
  var captcha = req.body.captcha;
  var mobile = req.body.mobile;

  // var password = req.body.password;

  var data = {
    name: name,
    // "email" : email,
    pass: pass,
    captcha: captcha,
    mobile: mobile,
    // "password" : password
  };

  db.collection("ynoll").insertOne(data, (err, collection) => {
    if (err) {
      throw err;
    }
    console.log(data);
  });

  //  res.redirect('/contact-success')
});

app.get("/contact-success", (req, res) => {
  res.render("contact-success", { data: req.body });
});

app.post("/", (req, res) => {
  var name = req.body.name;
  var pass = req.body.pass;
  var mobile = req.body.mobile;
  res.send(
    "<br> Your name is " +
      name +
      " <br> your pass is " +
      pass +
      " <br> your phone no: " +
      mobile +
      " <br> your captcha is"
  );
});

app
  .get("/", (req, res) => {
    res.render("contact", { qs: req.query });
  })
  .listen(9000);

console.log("Listening on PORT 9000");
