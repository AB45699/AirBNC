function convertPriceToNumber (properties) {
    let convertedPropertyPrices = [];

    properties.forEach((property)=>{
        convertedPropertyPrices.push({...property, price_per_night: Number(property.price_per_night)});
    });

    return convertedPropertyPrices

};

module.exports = convertPriceToNumber;