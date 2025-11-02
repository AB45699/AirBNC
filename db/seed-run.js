const seed = require("./seed");
const db = require("./connection.js");
const { propertyTypesData, usersData, propertiesData, reviewsData, imagesData, favouritesData, bookingsData } = require("./data");

seed(propertyTypesData, usersData, propertiesData, reviewsData, imagesData, favouritesData, bookingsData).then(()=>{
    db.end();
});
