const seed = require("./seed");
const { propertyTypesData, usersData, propertiesData, reviewsData } = require("./data/dev/index.js");

seed(propertyTypesData, usersData, propertiesData, reviewsData);
