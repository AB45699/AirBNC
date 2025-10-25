function insertProperties(userRef, propertyData) {
    return propertyData.map((property) => [
            userRef[property.host_name], 
            property.name, 
            property.location, 
            property.property_type, 
            property.price_per_night,
            property.description
    ]);
};

module.exports = insertProperties;