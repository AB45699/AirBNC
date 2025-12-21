function formatAmenities(properties) {
    const allAmenities = [];

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