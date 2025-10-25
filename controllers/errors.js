exports.handlePathNotFound = (req, res, next) => {
  res.status(404).send({ msg: "Path not found" });
};

exports.handleDataBaseErrors = (err, req, res, next) => {
  const codes = ["22P02", "23502", "23514"];

  if (err.code === "23503") {
    const item = err.constraint === "reviews_property_id_fkey" ? "Property" : "Guest";
    res.status(404).send({ msg: `${item} not found` });
  } else if (codes.includes(err.code)) {
    res.status(400).send({ msg: "Bad request" });
  } else {
    next(err);
  }
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.handleServerErrors = (err, req, res, next) => {
  res.status(500).send({ msg: "Server error" });
};
