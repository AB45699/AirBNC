const db = require("../db/connection.js");

exports.fetchProperties = async (sort, order) => {
    const allowedSorts = {
        price_per_night: `properties.price_per_night`, 
        popularity: `COALESCE (AVG(reviews.rating), 0)`, 
        favourites: `COUNT(favourites.property_id)`
    };

    const allowedOrders = {
        ASC: `ASC`, 
        DESC: `DESC`
    };

    const sortBy = allowedSorts[sort?.toLowerCase()] || allowedSorts.favourites;
    const orderDirection = allowedOrders[order?.toUpperCase()] || allowedOrders.DESC;
  
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
        ORDER BY ${sortBy} ${orderDirection}, properties.property_id ASC;`
    );

    return properties
};

exports.fetchProperty= async (id, user_id) => {
    let queryValues = [id];

    let selectQuery = `
        SELECT 
            properties.property_id, 
            properties.name AS property_name,
            properties.location, 
            properties.price_per_night, 
            properties.description, 
            CONCAT(users.first_name, ' ', users.surname) AS host,
            users.avatar AS host_avatar,
            COUNT(favourites.property_id) AS favourite_count
        `;

    let joinQuery = ` 
        FROM properties
        JOIN users 
        ON properties.host_id = users.user_id
        LEFT OUTER JOIN favourites
        ON properties.property_id = favourites.property_id
        `;

    let groupByQuery = `
        GROUP BY 
            properties.property_id,
            properties.name,
            properties.location,
            properties.price_per_night,
            properties.description,
            users.first_name,
            users.surname,
            users.avatar 
        `;

    if (user_id) {
        queryValues.push(user_id);
        
        joinQuery += `
        LEFT OUTER JOIN favourites user_favourited
            ON properties.property_id = user_favourited.property_id 
            AND user_favourited.user_id = $2
        `;

        selectQuery += `, 
        CASE
            WHEN user_favourited.user_id IS NULL THEN false
            ELSE true
        END AS favourited
    `;
    }

    const finalQuery = `
        ${selectQuery}
        ${joinQuery}
        WHERE properties.property_id = $1
        ${groupByQuery};
    `;

    const {
        rows: [property]
    } = await db.query(finalQuery, queryValues);

    console.log(property)
    return property
}

