## AirBNC

Run `npm i` to install any dependencies. 

This is an API for a property rental service. 

To create a database, use the command `npm run create-db`. 

The pool accesses the keys and values in the .env file via use of require("dotenv").config(). 
This loads all the variables from .env into process.env. 
The pool object can then read those values. 

Inside .env --> 
```PGDATABASE=airbnc_test``` 

Link for hosted version: https://airbnc-oijh.onrender.com 
