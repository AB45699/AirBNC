const express = require("express"); 
const { getProperties, getPropertyById } = require("./controllers/properties");
const { postPropertyReview, getPropertyReviews, deletePropertyReview } = require("./controllers/reviews.js");
const { handlePathNotFound, handleBadRequests, handleServerErrors, handleCustomErrors } = require("./controllers/errors");
const { getUserDetails } = require("./controllers/users.js");

const app = express(); 

app.use(express.json()); 

app.get("/api/properties", getProperties);

app.get("/api/properties/:id", getPropertyById);

app.post("/api/properties/:id/reviews", postPropertyReview);

app.get("/api/properties/:id/reviews", getPropertyReviews);

app.delete("/api/reviews/:id", deletePropertyReview);

app.get("/api/users/:id", getUserDetails);

app.all("/*path", handlePathNotFound);

app.use(handleBadRequests);

app.use(handleCustomErrors); 

app.use(handleServerErrors);

module.exports = app; 
