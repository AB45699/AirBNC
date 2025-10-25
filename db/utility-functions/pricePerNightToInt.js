function pricePerNightToInt (properties) {
    let pricesPerNightToInt = [];

    properties.forEach((property)=>{
        pricesPerNightToInt.push({...property, price_per_night: Number(property.price_per_night)});
    });

    return pricesPerNightToInt;
};

module.exports = pricePerNightToInt;