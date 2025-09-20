const db = require("./connection.js");
const  format  = require("pg-format");
const createHostsRef = require("./utils.js");

async function seed(propertyTypes, users, properties) {

    await db.query(`DROP TABLE IF EXISTS properties`);
    await db.query(`DROP TABLE IF EXISTS property_types;`);
    await db.query(`DROP TABLE IF EXISTS users;`);

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
        )`)

    await db.query(
        format(
            `INSERT INTO property_types (property_type, description) VALUES %L;`,
            propertyTypes.map(({ property_type, description }) => [property_type, description])
        ));
    
    const { rows: insertedUsers } = await db.query(
        format(
            `INSERT INTO users (first_name, surname, email, phone_number, is_host, avatar) VALUES %L RETURNING first_name, surname, user_id;`,
            users.map(({first_name, surname, email, phone_number, is_host, avatar}) => [first_name, surname, email, phone_number, is_host, avatar])
        )
    );

    const hostRefs = createHostsRef(insertedUsers);
    console.log(hostRefs)

    await db.query(
        format(
            `INSERT INTO properties (host_id, name, location, property_type, price_per_night, description) VALUES %L;`, 
            properties.map(({ name, property_type, location, price_per_night, description, host_name }) => 
                [
                    hostRefs[host_name],
                    name, 
                    location, 
                    property_type,
                    price_per_night, 
                    description
                ])
        )
    )
};

module.exports = seed;