function insertFavourites(userRef, propertyRef, favouritesData) {
    return favouritesData
        .filter(({guest_name, property_name})=>
            (userRef[guest_name] !== undefined) && (propertyRef[property_name] !== undefined)
        )
        .map(({guest_name, property_name})=>[
        userRef[guest_name],
        propertyRef[property_name]
    ]);
};

module.exports = insertFavourites;