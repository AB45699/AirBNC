const { checkUserExists } = require("../models/checkUserExists");
const { fetchProperties, fetchProperty } = require("../models/properties");
const checkIfNumber = require("../db/utility-functions/checkIfNumber.js");
const {checkPropertyTypeExists} = require("../models/propertyTypes.js");

exports.getProperties = async (req, res, next) => {
    const { sort, order, maxprice, minprice, property_type } = req.query; 
    
    if (maxprice && !(checkIfNumber(maxprice)) || minprice && !(checkIfNumber(minprice))) {
        return Promise.reject({status: 400, msg: "Bad request"})  
    };

    if (property_type) {
        await checkPropertyTypeExists(property_type);
    };

    const properties = await fetchProperties(sort, order, maxprice, minprice, property_type);
    
    res.status(200).send({ properties });
};

exports.getPropertyById = async (req, res, next) => {
    const { id } = req.params;
    const { user_id } = req.query;

    if (!checkIfNumber(id) || user_id && !checkIfNumber(user_id)) {
        return Promise.reject({status: 400, msg: "Bad request"});
    }

    if (user_id && !(await checkUserExists(user_id))) {
        return Promise.reject({status: 404, msg: "User not found"})
    };

    const property = await fetchProperty(id, user_id);
    
    if (property === undefined) {
        return Promise.reject({status: 404, msg: "Property not found"}); 
    };

    res.status(200).send({property});
};

