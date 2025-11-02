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

    const propertyPromises = [fetchProperties(sort, order, maxprice, minprice, property_type)];

    if (property_type) {
        propertyPromises.push(checkPropertyTypeExists(property_type));
    };

    const [properties, propertyType] = await Promise.all(propertyPromises);

    if (property_type && propertyType === undefined) {
            return Promise.reject({status: 404, msg: "Property type not found"});
    };
    
    res.status(200).send({ properties });
};

exports.getPropertyById = async (req, res, next) => {
    const { id } = req.params;
    const { user_id } = req.query;
    const invalidUserID = user_id && !checkIfNumber(user_id);
    const userNonExistent = user_id && ((await checkUserExists(user_id)) === undefined); 

    if (!checkIfNumber(id) || invalidUserID) {
        return Promise.reject({status: 400, msg: "Bad request"});
    };

    if (userNonExistent) {
        return Promise.reject({status: 404, msg: "User not found"})
    };

    const property = await fetchProperty(id, user_id);
    
    if (property === undefined) {
        return Promise.reject({status: 404, msg: "Property not found"}); 
    };

    res.status(200).send({property});
};

