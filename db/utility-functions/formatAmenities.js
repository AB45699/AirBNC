function formatAmenities(properties) {
    const allAmenities = [];

    if (properties.length === 0) {return allAmenities};
    
    for (const {amenities} of properties) {
            amenities.forEach((amenity)=>{
                if (!allAmenities.flat().includes(amenity)) {
                    allAmenities.push([amenity])
                } 
            });
    };
   
    return allAmenities
}

module.exports = formatAmenities;