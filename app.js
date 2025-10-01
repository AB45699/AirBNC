const express = require("express"); 
const { getProperties } = require("./controllers/properties");

const app = express(); 

app.use(express.json()); 

app.get("/api/properties", getProperties);

module.exports = app; 
