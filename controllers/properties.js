const { checkUserExists } = require("../models/users.js");
const { fetchProperties, fetchProperty } = require("../models/properties.js");
const checkIfNumber = require("../db/utility-functions/checkIfNumber.js");
const {checkPropertyTypeExists} = require("../models/propertyTypes.js");

exports.getProperties = async (req, res, next) => {
    const { sort, order, maxprice, minprice, property_type } = req.query; 
    const invalidMaxpriceQuery = maxprice && !(checkIfNumber(maxprice));
    const invalidMinpriceQuery = minprice && !(checkIfNumber(minprice))

    if (invalidMaxpriceQuery || invalidMinpriceQuery) {
        return Promise.reject({status: 400, msg: "Bad request"})  
    };

    const promises = [fetchProperties(sort, order, maxprice, minprice, property_type)];

    if (property_type) {
        promises.push(checkPropertyTypeExists(property_type));
    };

    const [properties, propertyType] = await Promise.all(promises);

    if (property_type && propertyType === undefined) {
        return Promise.reject({status: 404, msg: "Property type not found"});
    };
    
    res.status(200).send({ properties });
};

exports.getPropertyById = async (req, res, next) => {
    const { id } = req.params;
    const { user_id } = req.query;
    const invalidUserID = user_id && !checkIfNumber(user_id);

    if (!checkIfNumber(id) || invalidUserID) {
        return Promise.reject({status: 400, msg: "Bad request"});
    };

    const promises = [fetchProperty(id, user_id)];
    
    if (user_id) {
        promises.push(checkUserExists(user_id));
    };

    const [property, user] = await Promise.all(promises);

    if (user_id && user === undefined) {
        return Promise.reject({status: 404, msg: "User not found"});
    };
    
    if (property === undefined) {
        return Promise.reject({status: 404, msg: "Property not found"}); 
    };

    res.status(200).send({property});
};

