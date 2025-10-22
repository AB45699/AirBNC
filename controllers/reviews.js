const { checkPropertyExists } = require("../models/checkPropertyExists.js");
const {insertPropertyReview, fetchPropertyReviews, deletePropertyReview} = require("../models/reviews.js"); 
const getAverageRating = require("../db/utility-functions/getAverageRating.js");
const { checkReviewExists } = require("../models/checkReviewExists.js");
const checkIfNumber = require("../db/utility-functions/checkIfNumber.js");

exports.postPropertyReview = async (req, res, next) => {
    const { guest_id, rating, comment } = req.body;
    const { id } = req.params;
    
    const invalidId = !checkIfNumber(id);
    const invalidGuestId = !checkIfNumber(guest_id);
    const invalidRating = !checkIfNumber(rating) || rating > 5 || rating < 1;
    const invalidComment = comment && typeof comment !== "string";

    if (guest_id === undefined || rating === undefined ||
        invalidId || invalidGuestId || invalidRating ||
        invalidComment) {
        return Promise.reject({ status: 400, msg: "Bad request" });
    }

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

exports.deletePropertyReview = async (req, res, next) => {
    const { id } = req.params;
    
    if (await checkReviewExists(id) === undefined) {
        return Promise.reject({status: 404, msg: "Review not found"});
    }

    await deletePropertyReview(id);

    res.sendStatus(204);
};