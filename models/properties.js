const db = require("../db/connection.js");
const capitaliseFirstLetter = require("../db/utility-functions/capitaliseFirstLetter.js");

exports.fetchProperties = async (sort="favourites", order="desc", maxprice=null, minprice=null, propertyType=null) => {
    const allowedOrderQueries = ["asc", "desc"];
    const capitalisedPropertyType = propertyType && (capitaliseFirstLetter(propertyType));
    const queryValues = [maxprice, minprice, capitalisedPropertyType];

    const allowedSortQueries = {
        "favourites": "COALESCE(favourites_count, 0)",
        "price_per_night": "properties.price_per_night", 
        "popularity": "COALESCE(avg_rating, 0)"
    };

    if ((allowedSortQueries[sort.toLowerCase()]) === undefined) {
        return Promise.reject({status: 400, msg: "Invalid sort query"});
    }; 
    
    if (!allowedOrderQueries.includes(order.toLowerCase())) {
        return Promise.reject({status: 400, msg: "Invalid order query"});
    };

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
        LEFT OUTER JOIN (
            SELECT 
                property_id, 
                COUNT(*) AS favourites_count
            FROM favourites
            GROUP BY property_id
        ) favourites ON properties.property_id = favourites.property_id
        LEFT OUTER JOIN (
            SELECT 
                property_id, 
                AVG(rating) AS avg_rating
            FROM reviews
            GROUP BY property_id
        ) reviews ON properties.property_id = reviews.property_id
        WHERE 
            ($1::numeric IS NULL OR properties.price_per_night <= $1::numeric) AND
            ($2::numeric IS NULL OR properties.price_per_night >= $2::numeric) AND
            ($3::text IS NULL OR properties.property_type = $3::text)
        ORDER BY ${allowedSortQueries[sort.toLowerCase()]} ${order}, properties.property_id ASC;`, queryValues
    );
    
    return properties;
};

exports.fetchProperty = async (id, user_id) => {
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
        LEFT OUTER JOIN favourites user_favourites
            ON properties.property_id = user_favourites.property_id 
            AND user_favourites.guest_id = $2
        `;

        selectQuery += `, 
        CASE
            WHEN user_favourites.guest_id IS NULL THEN 'false'
            ELSE 'true'
        END AS favourited
    `;

        groupByQuery += `
        , user_favourites.guest_id
        `
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
    
    return property;
};

exports.checkPropertyExists = async (propertyID) => {
    const {rows: [property]} = await db.query(`SELECT property_id FROM properties
        WHERE property_id = $1
        GROUP BY property_id;`, [propertyID]);
    
    return property
};

