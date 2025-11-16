# AirBNC

AirBNC is a browser-based application. This is the backend server. The application allows users to browse property listings and make informed choices about where they want to stay on their next trip. 

**Link to project**: https://airbnc-oijh.onrender.com  

**How it's made**-

**Tech used**: JavaScript, Supertest, Express, node-postgres, PostgreSQL; Supabase and render to host 



Run `npm i` to install any dependencies. 

To create a database, use the command `npm run create-dbs`. 

The pool accesses the keys and values in the .env file via use of require("dotenv").config(). 
This loads all the variables from .env into process.env. 
The pool object can then read those values. 

Inside .env --> 
```PGDATABASE=airbnc_test``` 


