const db = require("../db/connection.js");

exports.checkPropertyTypeExists = async (propertyTypeQuery) => {
    const {rows: [propertyType]} = await db.query(
        `SELECT * FROM property_types
        WHERE property_type = $1;`, [propertyTypeQuery]);
    
    return propertyType;

};