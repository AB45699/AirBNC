function insertImages(propertyRef, imagesData) {
    return imagesData.map((image)=>[
        propertyRef[image.property_name],
        image.image_url, 
        image.alt_tag
    ])
};

module.exports = insertImages;