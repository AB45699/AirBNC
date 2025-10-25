const db = require("../connection.js");
const format = require("pg-format"); 
const { createUsersRef } = require("../utility-functions/createUsersRefs.js");
const { createPropertiesRef } = require("../utility-functions/createPropertiesRef.js");
const insertPropertyTypes = require("./insert-functions/insertPropertyTypes.js");
const insertUsers = require("./insert-functions/insertUsers.js");
const insertProperties = require("./insert-functions/insertProperties.js");

async function insertIntoTables(propertyTypes, users, properties, reviews, images, favourites, bookings) {
    
    await db.query(
        format(
            `INSERT INTO property_types (property_type, description) VALUES %L;`,
            insertPropertyTypes(propertyTypes)
        ));
    
    const { rows: insertedUsers } = await db.query(
        format(
            `INSERT INTO users (first_name, surname, email, phone_number, is_host, avatar) VALUES %L RETURNING first_name, surname, user_id;`,
            insertUsers(users)
        ));

    const usersRefs = createUsersRef(insertedUsers);

    const {rows: insertedProperties } = await db.query(
        format(
            `INSERT INTO properties (host_id, name, location, property_type, price_per_night, description) VALUES %L RETURNING name, property_id;`, 
            insertProperties(usersRefs, properties)
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

    await db.query(
        format(
            `INSERT INTO favourites (guest_id, property_id) VALUES %L;`, 
            favourites.map(({ guest_name, property_name }) => [
                usersRefs[guest_name],
                propertiesRefs[property_name], 
            ])
        )
    );

    await db.query(
        format(
            `INSERT INTO bookings (property_id, guest_id, check_in_date, check_out_date ) VALUES %L;`, 
            bookings.map(({ property_name, guest_name, check_in_date, check_out_date }) => [
                propertiesRefs[property_name],
                usersRefs[guest_name],
                check_in_date, 
                check_out_date,
            ])
        )
    );

    const allAmenities = properties.map(({ amenities }) => {
        return amenities.map((amenity) => [amenity]) 
    }).flat() 

    await db.query(
        format(
            `INSERT INTO amenities (amenity) VALUES %L ON CONFLICT DO NOTHING;`, 
            allAmenities
        )
    );

    const propertiesToAmenities = properties.map(({ name, amenities }) => {
        return amenities.map((amenity) => [name, amenity])
    }).flat() 
    
    
    await db.query(
        format(
            `INSERT INTO properties_amenities (property_id, amenity_slug) VALUES %L;`,
            propertiesToAmenities.map((propToAmenity) => [
                propertiesRefs[propToAmenity[0]], 
                propToAmenity[1]
        ])
        )
    )
}

module.exports = insertIntoTables;