const express = require("express");
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use(require("../routers/index"));


app.listen(3000);
console.log("Server running in: http://localhost:3000");