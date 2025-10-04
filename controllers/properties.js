const { fetchProperties } = require("../models/properties")

exports.getProperties = async (req, res, next) => {
    const { sort } = req.query; 
    const properties = await fetchProperties(sort);
    
    res.status(200).send({ properties });
};