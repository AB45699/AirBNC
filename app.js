const express = require("express"); 
const path = require("path");
const { getProperties, getPropertyById } = require("./controllers/properties");
const { postPropertyReview, getPropertyReviews, deletePropertyReview } = require("./controllers/reviews.js");
const { handlePathNotFound, handleDataBaseErrors, handleServerErrors, handleCustomErrors } = require("./controllers/errors");
const { getUserDetails } = require("./controllers/users.js");
const { getView } = require("./controllers/view.js");
const cors = require("cors");

const app = express(); 

app.use(cors());

app.use(express.json()); 

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", getView);

app.get("/api/properties", getProperties);

app.get("/api/properties/:id", getPropertyById);

app.post("/api/properties/:id/reviews", postPropertyReview);

app.get("/api/properties/:id/reviews", getPropertyReviews);

app.delete("/api/reviews/:id", deletePropertyReview);

app.get("/api/users/:id", getUserDetails);

app.all("/*path", handlePathNotFound);

app.use(handleDataBaseErrors);

app.use(handleCustomErrors); 

app.use(handleServerErrors);

module.exports = app; 
