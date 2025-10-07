const express = require("express"); 
const { getProperties, getPropertyById } = require("./controllers/properties");
const { handlePathNotFound, handleBadRequests, handleServerErrors, handleCustomErrors } = require("./controllers/errors");

const app = express(); 

app.use(express.json()); 

app.get("/api/properties", getProperties);

app.get("/api/properties/:id", getPropertyById);

app.all("/*path", handlePathNotFound);

app.use(handleBadRequests);

app.use(handleCustomErrors); 

app.use(handleServerErrors);

module.exports = app; 
