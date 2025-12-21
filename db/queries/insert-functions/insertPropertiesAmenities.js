function insertPropertiesAmenities(propertyRef, properties) {
    const propertiesToAmenities = [];

    for (const {amenities, name} of properties) {
        amenities.forEach((amenity)=>{
            propertiesToAmenities.push([
                propertyRef[name], 
                amenity
            ])
        })
    };

    return propertiesToAmenities;

};

module.exports = insertPropertiesAmenities;