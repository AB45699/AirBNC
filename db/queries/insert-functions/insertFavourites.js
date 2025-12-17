function insertFavourites(userRef, propertyRef, favouritesData) {
    return favouritesData.map(({guest_name, property_name})=>[
        userRef[guest_name],
        propertyRef[property_name]
    ]);
};

module.exports = insertFavourites;