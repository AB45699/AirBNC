const db = require("../db/connection.js");

exports.checkReviewExists = async (reviewID) => {
    const {rows: [review]} = await db.query(`SELECT review_id FROM reviews
        WHERE review_id = $1
        GROUP BY review_id;`, [reviewID]);
    
    return review
};