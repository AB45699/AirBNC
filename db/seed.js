const dropTables = require("./queries/dropTables.js");
const createTables = require("./queries/createTables.js");
const insertIntoTables = require("./queries/insertIntoTables.js");

async function seed(propertyTypes, users, properties, reviews) {

    await dropTables();
    await createTables();
    await insertIntoTables(propertyTypes, users, properties, reviews);

    

};

module.exports = seed;