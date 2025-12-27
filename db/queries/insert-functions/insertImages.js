function insertImages(propertyRef, imagesData) {
    return imagesData
        .filter(({property_name})=>
            propertyRef[property_name] !== undefined
        )
        .map(({property_name, image_url, alt_tag})=>[
            propertyRef[property_name],
            image_url, 
            alt_tag
        ])
};

module.exports = insertImages;