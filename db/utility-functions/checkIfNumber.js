function checkIfNumber(stringNumber) {
    if (typeof stringNumber === "string") {
        if (isFinite(stringNumber)) {
            return true
        }
    }
    return false
};
module.exports = checkIfNumber;
