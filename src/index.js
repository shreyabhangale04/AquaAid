const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const fs = require("fs");
const collection = require("./config");
const session = require("express-session");

const app = express();
const port = 5000;

const viewsPath = path.join(__dirname, "..", "views");

app.use(
  session({
    secret: "aqua-aid-secret", // use process.env.SECRET in production
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // secure: true if using HTTPS in production
  })
);

//middleware to protect routes
function isAuthenticated(req, res, next) {
  if (req.session.user) next();
  else res.redirect("/login");
}

//restrict access to certain pages if not logged in or registered
app.get("/coral", isAuthenticated, (req, res) => {
  res.sendFile(path.join(viewsPath, "coral.html"));
});

// Middleware
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Dynamically serve all HTML files (except login/register/index which are handled separately)
fs.readdirSync(viewsPath).forEach((file) => {
  if (file.endsWith(".html")) {
    const route = "/" + file.replace(".html", "");
    if (["/login", "/register", "/index"].includes(route)) return; // skip special routes

    app.get(route, (req, res) => {
      res.sendFile(path.join(viewsPath, file));
    });
  }
});

// Specific routes (login, register, index)
app.get("/", (req, res) => {
  res.sendFile(path.join(viewsPath, "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(viewsPath, "login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(viewsPath, "register.html"));
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      return res.send("Error logging out");
    }
    res.redirect("/login");
  });
});

app.post("/register", async (req, res) => {
  const data = {
    name: req.body.username,
    password: req.body.password,
  };
  // check if user already exists
  const existingUser = await collection.findOne({ name: data.name });
  if (existingUser) {
    res.send("User already exists. Please choose a different username.");
  } else {
    //hash the password using bcrypt
    const saltRounds = 10; // no of salt rounds for bcrypt
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    data.password = hashedPassword; //replace hashed password with og password

    const userdata = await collection.insertMany(data);
    console.log(userdata);
    return res.sendFile(path.join(viewsPath, "index.html"));
  }
});

app.post("/login", async (req, res) => {
  try {
    const check = await collection.findOne({ name: req.body.username });

    if (!check) {
      return res.send("User name not found");
    }

    // Compare plain password with hashed password in DB
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      check.password
    );

    if (isPasswordMatch) {
      req.session.user = check.name; // Store the logged-in user
      // Send home.html on successful login
      return res.sendFile(path.join(__dirname, "..", "views", "index.html"));
    } else {
      return res.send("Wrong password");
    }
  } catch (err) {
    res.send("Wrong details");
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
