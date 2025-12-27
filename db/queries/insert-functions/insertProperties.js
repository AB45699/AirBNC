function insertProperties(userRef, propertyData) {
    return propertyData
        .filter(({host_name})=>
            userRef[host_name] !== undefined
        ) 
        .map(({host_name, name, location, property_type, price_per_night, description}) => [
            userRef[host_name], 
            name, 
            location, 
            property_type, 
            price_per_night,
            description
    ]);
};

module.exports = insertProperties;