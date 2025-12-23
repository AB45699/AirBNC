function insertPropertiesAmenities(propertyRef, properties) {
    const propertiesToAmenities = [];

    for (const {amenities, name} of properties) {
        if (!Array.isArray(amenities)) continue ;

        const propertyID = propertyRef[name];

        if (propertyID === undefined) continue ;

        amenities.forEach((amenity)=>{
            propertiesToAmenities.push([
                    propertyID, 
                    amenity
                ])
        });

    };

    return propertiesToAmenities;
};

module.exports = insertPropertiesAmenities;