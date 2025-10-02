const express = require("express"); 
const { getProperties } = require("./controllers/properties");

const app = express(); 

app.use(express.json()); 

app.get("/api/properties", getProperties);

app.all("/*path", (req, res, next) => {
    res.status(404).send({msg: "Path not found"}); 
})

module.exports = app; 
