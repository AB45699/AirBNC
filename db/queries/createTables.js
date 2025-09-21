const db = require("../connection.js");

async function createTables() {
    
    await db.query(`CREATE TABLE users (
        user_id SERIAL PRIMARY KEY, 
        first_name VARCHAR NOT NULL,
        surname VARCHAR NOT NULL,
        email VARCHAR NOT NULL, 
        phone_number VARCHAR, 
        is_host BOOLEAN NOT NULL, 
        avatar VARCHAR, 
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`);

    await db.query(`CREATE TABLE property_types (
        property_type VARCHAR PRIMARY KEY, 
        description TEXT NOT NULL
        );`);


    await db.query(`CREATE TABLE properties (
        property_id SERIAL PRIMARY KEY, 
        host_id INT NOT NULL, 
        name VARCHAR NOT NULL, 
        location VARCHAR NOT NULL, 
        property_type VARCHAR NOT NULL, 
        price_per_night decimal NOT NULL, 
        description TEXT, 
        FOREIGN KEY (host_id) REFERENCES users (user_id), 
        FOREIGN KEY (property_type) REFERENCES property_types (property_type)
        )`);
    
    await db.query(`CREATE TABLE reviews (
        review_id SERIAL PRIMARY KEY, 
        property_id INT NOT NULL, 
        guest_id INT NOT NULL, 
        rating INT NOT NULL, 
        comment TEXT, 
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (property_id) REFERENCES properties (property_id),
        FOREIGN KEY (guest_id) REFERENCES users (user_id)
        )`);
    
    await db.query(`CREATE TABLE images (
        image_id SERIAL PRIMARY KEY,
        property_id INT NOT NULL, 
        image_url VARCHAR NOT NULL, 
        alt_text VARCHAR NOT NULL, 
        FOREIGN KEY (property_id) REFERENCES properties (property_id)
        );`);

    await db.query(`CREATE TABLE favourites (
        favourite_id SERIAL PRIMARY KEY, 
        guest_id INT NOT NULL, 
        property_id INT NOT NULL, 
        FOREIGN KEY (property_id) REFERENCES properties (property_id),
        FOREIGN KEY (guest_id) REFERENCES users (user_id)
        );`);

    await db.query(`CREATE TABLE bookings (
        booking_id SERIAL PRIMARY KEY, 
        property_id INT NOT NULL,
        guest_id INT NOT NULL, 
        check_in_date DATE NOT NULL, 
        check_out_date DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (property_id) REFERENCES properties (property_id),
        FOREIGN KEY (guest_id) REFERENCES users (user_id)
        );`);
    
    await db.query(`CREATE TABLE amenities (
        amenity VARCHAR PRIMARY KEY
        );`);
    
    await db.query(`CREATE TABLE properties_amenities (
        property_amenity_id SERIAL PRIMARY KEY, 
        property_id INT NOT NULL, 
        amenity_slug VARCHAR NOT NULL, 
        FOREIGN KEY (property_id) REFERENCES properties (property_id),
        FOREIGN KEY (amenity_slug) REFERENCES amenities (amenity)
        );`);
}

module.exports = createTables;