# 🏡 AirBNC - Property Rental API 

AirBNC is a browser-based application. This is the backend server, a RESTful API. The application allows users to browse property listings and make informed choices about where they want to stay on their next trip. 

**Link to hosted server**: https://airbnc-oijh.onrender.com  


# 🚀 How it is made

**Tech used**: JavaScript, Supertest, Express, node-postgres, PostgreSQL; Supabase and render to host 


# 🔧 How to use

Run `npm i` to install any dependencies. 

The pool accesses the keys and values in the .env file via use of require("dotenv").config(). 
This loads all the variables from .env into process.env. 
The pool object can then read those values. 

Create the following environment files: 

Inside `.env.test` --> 
```PGDATABASE=airbnc_test``` 

Inside `.env.development` --> 
```PGDATABASE=airbnc_dev``` 

To create the databases, use the command `npm run create-dbs`. 

To seed the test database, use the command `npm run seed-test`. 

To seed the development database, use the command `npm run seed-dev`. 

To run the server, use the command `npm run dev`. 


# 🏡 Features

The server currently has the following endpoints (view further details [on the hosted link](https://airbnc-oijh.onrender.com)): 

1. GET a list of all properties returned in descending order of number of favourites `/api/properties`
* Optional filters: 
    * order: asc or desc 
      * example usage: `/api/properties?order=asc`

    * sortable by: popularity, favourites or price_per_night 
      * example usage: `/api/properties?sort=popularity`

    * further optional filters: property_type, minprice, maxprice 
      * example usage: `/api/properties?property_type=bungalow`

2. GET details of an individual property `/api/properties/{id}`

3. GET the reviews of a single property `/api/properties/{id}/reviews`

4. POST a review on a property `/api/properties/{id}/reviews`

5. DELETE a review `/api/reviews/{id}`

6. GET user details `/api/users/{id}`


# 🧪 Testing 

All endpoints are comprehensively tested with Supertest. Tests are found in `__tests__/app.test.js`. 

To run the test suite, run the command `npm test`.

Utility functions and table-insert functions are tested with Jest. Run `npm run test-utils` or `npm run test-inserts` to run each test suite respectively. 

# 🧠 Refactoring & Improvements

To test if non-existent property or user ids were provided, functions such as `checkPropertyExists()` in `/models/properties.js` would connect to the database first and if undefined was not returned (i.e. data existed) a second connection would occur to fetch the required data. 

Two group these two connections into one and to streamline the process, I used a `Promise.all` to combine the validation and data retrieval processes. 

# 🏗️ To do - work in progress!

**Status**: project in development.

- Remaining insert into table functions to be created
- Further endpoints to be added (e.g. POST favourite, GET property amenities)