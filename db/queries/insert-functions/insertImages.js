function insertImages(propertyRef, imagesData) {
    return imagesData.map(({property_name, image_url, alt_tag})=>[
        propertyRef[property_name],
        image_url, 
        alt_tag
    ])
};

module.exports = insertImages;