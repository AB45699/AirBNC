const { checkPropertyExists } = require("../models/checkPropertyExists.js");
const {insertPropertyReview, fetchPropertyReviews} = require("../models/reviews.js"); 
const getAverageRating = require("../db/utility-functions/getAverageRating.js");

exports.postPropertyReview = async (req, res, next) => {
    const { guest_id, rating, comment } = req.body;
    const { id } = req.params;
    
    if (comment && typeof comment !== "string") {
       return Promise.reject({status: 400, msg: "Bad request"});
    };

    const propertyReview = await insertPropertyReview(guest_id, rating, comment, id);
    
    res.status(201).send({propertyReview});
};

exports.getPropertyReviews = async (req, res, next) => {
    const { id } = req.params;

    if (id) {
        const property = await checkPropertyExists(id);
        if (property === undefined) {
            return Promise.reject({status: 404, msg: "Property not found"});
        }
    };

    const reviews = await fetchPropertyReviews(id);
    const averageRating = getAverageRating(reviews);
    
    res.status(200).send({
        reviews,
        average_rating: averageRating
    })
};