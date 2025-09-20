const seed = require("./seed");
const { propertyTypesData, usersData, propertiesData, reviewsData, imagesData, favouritesData } = require("./data/dev/index.js");

seed(propertyTypesData, usersData, propertiesData, reviewsData, imagesData, favouritesData);
