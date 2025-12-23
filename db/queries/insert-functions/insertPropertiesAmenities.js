function insertPropertiesAmenities(propertyRef, properties) {
    const propertiesToAmenities = [];

    for (const {amenities, name} of properties) {
        if (Array.isArray(amenities)) {
            amenities.forEach((amenity)=>{
                const propertyID = propertyRef[name];

                if (propertyID !== undefined) {
                    propertiesToAmenities.push([
                        propertyID, 
                        amenity
                    ])
                };
            });
        };
    };

    return propertiesToAmenities;
};

module.exports = insertPropertiesAmenities;