const db = require("./connection.js");
const  format  = require("pg-format");

async function seed(propertyTypes, users) {

    await db.query(`DROP TABLE IF EXISTS property_types;`);
    await db.query(`DROP TABLE IF EXISTS users;`);

    await db.query(`CREATE TABLE property_types (
        property_type VARCHAR PRIMARY KEY, 
        description TEXT NOT NULL
        );`);

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

    await db.query(
        format(
            `INSERT INTO property_types (property_type, description) VALUES %L;`,
            propertyTypes.map(({ property_type, description }) => [property_type, description])
        ));
    
    await db.query(
        format(
            `INSERT INTO users (first_name, surname, email, phone_number, is_host, avatar) VALUES %L;`,
            users.map(({first_name, surname, email, phone_number, is_host, avatar}) => [first_name, surname, email, phone_number, is_host, avatar])
        )
    );

};

module.exports = seed;