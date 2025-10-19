exports.handlePathNotFound = (req, res, next) => {
    res.status(404).send({msg: "Path not found"}); 
    
}; 

exports.handleBadRequests = (err, req, res, next) => {
    const codes = ["22P02", "23502", "23514"];
    
    if (codes.includes(err.code)) {
        res.status(400).send({msg: "Bad request"});
    } else {
        next(err);
    }
}; 

exports.handleCustomErrors = (err, req, res, next) => {
    if (err.code === "23503") {

        if (err.constraint === "reviews_property_id_fkey") {
            res.status(404).send({msg: "Property not found"});
        } else {
            res.status(404).send({msg: "Guest not found"});
        }
       
    } else if (err.status) {
        res.status(err.status).send({msg: err.msg});

    } else {
        next(err);
    }
};

exports.handleServerErrors = (err, req, res, next) => {
    res.status(500).send({msg: "Server error"});
}; 