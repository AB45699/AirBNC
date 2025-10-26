function insertReviews(propertyRef, userRef, reviewData) {
    return reviewData.map((review)=>[
        propertyRef[review.property_name], 
        userRef[review.guest_name], 
        review.rating, 
        review.comment, 
        review.created_at
    ]);
};

module.exports = insertReviews;