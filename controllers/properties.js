const { fetchProperties, fetchProperty } = require("../models/properties")

exports.getProperties = async (req, res, next) => {
    const { sort, order } = req.query; 
    const properties = await fetchProperties(sort, order);
    
    res.status(200).send({ properties });
};

exports.getPropertyById = async (req, res, next) => {
    const { id } = req.params;
    const property = await fetchProperty(id);

    res.status(200).send({property});
}