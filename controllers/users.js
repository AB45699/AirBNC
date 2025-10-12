const { checkUserExists } = require("../models/checkUserExists.js");
const { fetchUserDetails } = require("../models/users.js");

exports.getUserDetails = async (req, res, next) =>{
    const { id } = req.params;

    if (await checkUserExists(id) === undefined) {
        return Promise.reject({status: 404, msg: "User not found"})
    };

    const user = await fetchUserDetails(id);
    
    res.status(200).send({user});
};