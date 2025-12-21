function insertPropertiesAmenities(propertyRef, properties) {
    const propertiesToAmenities = [];

    for (const {amenities, name} of properties) {
        amenities.forEach((amenity)=>{

            const propertyID = propertyRef[name];

            if (propertyID !== undefined) {
                propertiesToAmenities.push([
                    propertyID, 
                    amenity
                ])
            }
            
        })
    };

    return propertiesToAmenities;

};

module.exports = insertPropertiesAmenities;