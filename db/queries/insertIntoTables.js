const db = require("../connection.js");
const format = require("pg-format"); 
const {
    createUsersRef,
    createPropertiesRef,
    insertPropertyTypes,
    insertUsers,
    insertReviews,
    insertProperties,
    insertImages,
    insertFavourites,
    insertBookings,
    insertAmenities,
    insertPropertiesAmenities
} = require("./index.js");


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
            insertReviews(propertiesRefs, usersRefs, reviews)
        )
    );

    await db.query(
        format(
            `INSERT INTO images (property_id, image_url, alt_text) VALUES %L;`, 
            insertImages(propertiesRefs, images)
        )
    );

    await db.query(
        format(
            `INSERT INTO favourites (guest_id, property_id) VALUES %L;`, 
            insertFavourites(usersRefs, propertiesRefs, favourites)
        )
    );

    await db.query(
        format(
            `INSERT INTO bookings (property_id, guest_id, check_in_date, check_out_date ) VALUES %L;`, 
            insertBookings(propertiesRefs, usersRefs, bookings)
        )
    );

    await db.query(
        format(
            `INSERT INTO amenities (amenity) VALUES %L;`, 
            insertAmenities(properties)
        )
    );

    await db.query(
        format(
            `INSERT INTO properties_amenities (property_id, amenity_slug) VALUES %L;`,
            insertPropertiesAmenities(propertiesRefs, properties)
        )
    );
}

module.exports = insertIntoTables;