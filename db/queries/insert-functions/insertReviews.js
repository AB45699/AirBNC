function insertReviews(propertyRef, userRef, reviewData) {
    return reviewData.filter(({property_name, guest_name})=> 
        (propertyRef[property_name] !== undefined) && (userRef[guest_name] !== undefined)
    )
    .map(({property_name, guest_name, rating, comment, created_at})=>[
        propertyRef[property_name], 
        userRef[guest_name], 
        rating, 
        comment, 
        created_at
    ]);
};

module.exports = insertReviews;