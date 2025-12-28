function insertAmenities(properties) {
    const allAmenities = [];
    const seenAmenities = new Set();

    for (const {amenities} of properties) {
        if (amenities !== undefined && Array.isArray(amenities)) {
            amenities.forEach((amenity)=>{
                if (!seenAmenities.has(amenity)) {
                    allAmenities.push([amenity]);
                    seenAmenities.add(amenity);
                } 
            });
        }
            
    };
   
    return allAmenities
}

module.exports = insertAmenities;