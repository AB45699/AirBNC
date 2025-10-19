const db = require("../db/connection.js");

exports.checkPropertyTypeExists = async (propertyTypeQuery) => {
    const {rows: [propertyType]} = await db.query(`SELECT * FROM property_types
        WHERE property_type = $1;`, [propertyTypeQuery]);
    
    if (!propertyType) {
        return Promise.reject({status: 404, msg: "Property type not found"});
    };
};