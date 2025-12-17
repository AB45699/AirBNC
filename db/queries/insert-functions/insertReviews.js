function insertReviews(propertyRef, userRef, reviewData) {
    return reviewData.map(({property_name, guest_name, rating, comment, created_at})=>[
        propertyRef[property_name], 
        userRef[guest_name], 
        rating, 
        comment, 
        created_at
    ]);
};

module.exports = insertReviews;