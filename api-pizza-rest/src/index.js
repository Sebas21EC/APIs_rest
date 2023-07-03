// Package
const express = require("express");
const app = express();

// middlewears
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use(require("../routers/index"));

//app execution
app.listen(3000);
console.log("Server running in: http://localhost:3000");
