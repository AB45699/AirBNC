const db = require("../db/connection.js"); 

exports.insertPropertyReview = async (guest_id, rating, comment, id) => {
    const {rows: [propertyReview] } = await db.query(
        `INSERT INTO reviews (property_id, guest_id, rating, comment)
        VALUES 
        ($1, $2, $3, $4) RETURNING *;`, [id, guest_id, rating, comment]);

    return propertyReview;
};

exports.fetchPropertyReviews = async (id) => {
    const { rows: reviews } = await db.query(
        `SELECT 
            reviews.review_id, 
            reviews.comment, 
            reviews.rating, 
            reviews.created_at,
            CONCAT(users.first_name, ' ', users.surname) AS guest, 
            users.avatar AS guest_avatar
        FROM reviews
        JOIN users
        ON reviews.guest_id = users.user_id
        WHERE reviews.property_id = $1
        ORDER BY reviews.created_at DESC;`, [id] 
    );

    return reviews;
}