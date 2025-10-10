const db = require("../db/connection.js");

exports.checkUserExists = async (userID) => {
    const {rows: [user]} = await db.query(`SELECT user_id FROM users
        WHERE user_id = $1
        GROUP BY user_id;`, [userID]);
    
    return user
};