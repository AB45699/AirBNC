const { checkUserExists } = require("../models/checkUserExists");
const { fetchProperties, fetchProperty, insertPropertyReview } = require("../models/properties")

exports.getProperties = async (req, res, next) => {
    const { sort, order } = req.query; 
    const properties = await fetchProperties(sort, order);
    
    res.status(200).send({ properties });
};

exports.getPropertyById = async (req, res, next) => {
    const { id } = req.params;
    const { user_id } = req.query;

    if (user_id) {
        const user = await checkUserExists(user_id);
        if (user === undefined) {
            return Promise.reject({status: 404, msg: "User not found"})
        }
    };

    const property = await fetchProperty(id, user_id);

    if (property === undefined) {
        return Promise.reject({status: 404, msg: "Property not found"}); 
    };

    res.status(200).send({property});
};

exports.postPropertyReview = async (req, res, next) => {
    const { guest_id, rating, comment } = req.body;
    const { id } = req.params;
    
    if (comment && typeof comment !== "string") {
       return Promise.reject({status: 400, msg: "Bad request"});
    };

    const propertyReview = await insertPropertyReview(guest_id, rating, comment, id);
    
    res.status(201).send({propertyReview});
};