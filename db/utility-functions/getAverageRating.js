function getAverageRating(reviews) {
    const totaledRatings = reviews.reduce((sum, review)=>{
        return sum += review.rating;
    }, 0);

    const averageRating = totaledRatings/reviews.length;

    return isNaN(averageRating) ? 0 : averageRating;
};

module.exports = getAverageRating;