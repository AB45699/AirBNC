const db = require("../db/connection.js");

exports.fetchProperties = async (sort) => {
    const allowedSorts = {
        price_per_night: `properties.price_per_night`, 
        popularity: `COALESCE (AVG(reviews.rating), 0)`, 
        favourites: `COUNT(favourites.property_id)`
    };

    const sortBy = allowedSorts[sort] || allowedSorts.favourites;

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
        LEFT OUTER JOIN favourites 
        ON properties.property_id = favourites.property_id
        LEFT OUTER JOIN reviews 
        ON properties.property_id = reviews.property_id
        GROUP BY (properties.name,  
                properties.location, 
                properties.price_per_night,
                properties.property_id,
                users.first_name,
                users.surname)
        ORDER BY ${sortBy} DESC, properties.property_id ASC;`
    );

    return properties
}