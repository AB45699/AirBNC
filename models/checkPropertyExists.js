const db = require("../db/connection.js");

exports.checkPropertyExists = async (propertyID) => {
    const {rows: [property]} = await db.query(`SELECT property_id FROM properties
        WHERE property_id = $1
        GROUP BY property_id;`, [propertyID]);
    
    return property
};