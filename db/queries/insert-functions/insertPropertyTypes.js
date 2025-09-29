function insertPropertyTypes(propertyTypes) {
    return propertyTypes.map(({ property_type, description }) => [
                property_type, 
                description
            ]);
};

module.exports = insertPropertyTypes;