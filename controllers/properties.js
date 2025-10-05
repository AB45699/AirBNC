const { fetchProperties } = require("../models/properties")

exports.getProperties = async (req, res, next) => {
    const { sort, order } = req.query; 

    const properties = await fetchProperties(sort, order);
    
    res.status(200).send({ properties });
};