const db = require("../connection.js");
const format = require("pg-format"); 
const { createUsersRef } = require("../utility functions/createUsersRefs.js");
const { createPropertiesRef } = require("../utility functions/createPropertiesRef.js");

async function insertIntoTables(propertyTypes, users, properties, reviews, images) {
    
    await db.query(
        format(
            `INSERT INTO property_types (property_type, description) VALUES %L;`,
            propertyTypes.map(({ property_type, description }) => [
                property_type, 
                description
            ])
        ));
    
    const { rows: insertedUsers } = await db.query(
        format(
            `INSERT INTO users (first_name, surname, email, phone_number, is_host, avatar) VALUES %L RETURNING first_name, surname, user_id;`,
            users.map(({first_name, surname, email, phone_number, is_host, avatar}) => [
                first_name, 
                surname, 
                email, 
                phone_number, 
                is_host, 
                avatar
            ])
        )
    );

    const usersRefs = createUsersRef(insertedUsers);

    const {rows: insertedProperties } = await db.query(
        format(
            `INSERT INTO properties (host_id, name, location, property_type, price_per_night, description) VALUES %L RETURNING name, property_id;`, 
            properties.map(({ name, property_type, location, price_per_night, description, host_name }) => 
                [
                    usersRefs[host_name],
                    name, 
                    location, 
                    property_type,
                    price_per_night, 
                    description
                ])
        )
    );

    const propertiesRefs = createPropertiesRef(insertedProperties);

    await db.query(
        format(
            `INSERT INTO reviews (property_id, guest_id, rating, comment, created_at) VALUES %L;`, 
            reviews.map(({ property_name, guest_name, rating, comment, created_at }) => [
                propertiesRefs[property_name], 
                usersRefs[guest_name], 
                rating, 
                comment, 
                created_at
            ])
        )
    );

    await db.query(
        format(
            `INSERT INTO images (property_id, image_url, alt_text) VALUES %L;`, 
            images.map(({ property_name, image_url, alt_tag}) => [
                propertiesRefs[property_name], 
                image_url, 
                alt_tag
            ])
        )
    );
}

module.exports = insertIntoTables;