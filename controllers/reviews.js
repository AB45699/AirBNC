const {insertPropertyReview, fetchPropertyReviews} = require("../models/reviews.js"); 

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
    const reviews = await fetchPropertyReviews(id);

    const totaledRatings = reviews.reduce((sum, review)=>{
        return sum += review.rating;
    }, 0);

    const averageRating = totaledRatings/reviews.length;

    res.status(200).send({
        reviews,
        average_rating: averageRating
    })
};