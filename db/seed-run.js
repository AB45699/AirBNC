const seed = require("./seed");
const { propertyTypesData, usersData } = require("./data/dev/index.js");

seed(propertyTypesData, usersData);
