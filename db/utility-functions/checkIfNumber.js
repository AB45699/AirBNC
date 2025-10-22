function checkIfNumber(value) {
    if (typeof value === "string" || typeof value === "number") {
        if (isFinite(value)) {
            return true
        }
    }
    return false
};
module.exports = checkIfNumber;
