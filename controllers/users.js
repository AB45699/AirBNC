const checkIfNumber = require("../db/utility-functions/checkIfNumber.js");
const { fetchUserDetails } = require("../models/users.js");

exports.getUserDetails = async (req, res, next) =>{
    const { id } = req.params;

    if (!checkIfNumber(id)) {
        return Promise.reject({status: 400, msg: "Bad request"});
    };

    const user = await fetchUserDetails(id);

    if (user === undefined) {
        return Promise.reject({status: 404, msg: "User not found"});
    };

    res.status(200).send({user});
};