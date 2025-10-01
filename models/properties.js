const db = require("../db/connection.js");

exports.fetchProperties = async () => {
    const { rows: properties } = await db.query(
        `SELECT 
            properties.property_id, 
            properties.name AS property_name, 
            properties.location, 
            properties.price_per_night, 
            CONCAT(users.first_name, ' ', users.surname) AS host
        FROM properties
        JOIN users
        ON properties.host_id = users.user_id
        JOIN favourites 
        ON properties.property_id = favourites.property_id
        GROUP BY (properties.name,  
                properties.location, 
                properties.price_per_night,
                properties.property_id,
                users.first_name,
                users.surname)
        ORDER BY COUNT(favourites.property_id) DESC;`
    );

    return properties
}