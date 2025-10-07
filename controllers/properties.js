const { fetchProperties, fetchProperty } = require("../models/properties")

exports.getProperties = async (req, res, next) => {
    const { sort, order } = req.query; 
    const properties = await fetchProperties(sort, order);
    
    res.status(200).send({ properties });
};

exports.getPropertyById = async (req, res, next) => {
    const { id } = req.params;
    const { user_id } = req.query;
    const property = await fetchProperty(id, user_id);

    if (property === undefined) {
        return Promise.reject({status: 404, msg: "Property not found"}); 
    }

    res.status(200).send({property});
}