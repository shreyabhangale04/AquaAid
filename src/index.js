const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const fs = require("fs");

const app = express();
const port = 5000;

// Middleware
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Views path
const viewsPath = path.join(__dirname, "..", "views");

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

// Start server
app.listen(port, () => {
  console.log(`✅ Server listening on port: ${port}`);
});
