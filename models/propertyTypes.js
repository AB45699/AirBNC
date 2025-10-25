const db = require("../db/connection.js");
const capitaliseFirstLetter = require("../db/utility-functions/capitaliseFirstLetter.js");

exports.checkPropertyTypeExists = async (propertyTypeQuery) => {
    const capitalisedPropertyType = capitaliseFirstLetter(propertyTypeQuery);

    const {rows: [propertyType]} = await db.query(
        `SELECT * FROM property_types
        WHERE property_type = $1;`, [capitalisedPropertyType]);
    
    return propertyType;

};