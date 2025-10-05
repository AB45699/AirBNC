const express = require("express"); 
const { getProperties, getPropertyById } = require("./controllers/properties");

const app = express(); 

app.use(express.json()); 

app.get("/api/properties", getProperties);

app.get("/api/properties/:id", getPropertyById);

app.all("/*path", (req, res, next) => {
    res.status(404).send({msg: "Path not found"}); 
});

app.use((err, res, req, next)=>{
    res.status(500).send({msg: "Server error"});
});

module.exports = app; 
