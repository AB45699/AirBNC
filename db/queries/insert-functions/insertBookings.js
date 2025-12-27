function insertBookings(propertyRef, userRef, bookingsData) {
    return bookingsData
        .filter(({ property_name, guest_name }) => 
            (propertyRef[property_name] !== undefined) && (userRef[guest_name] !== undefined)
        )
        .map(({ property_name, guest_name, check_in_date, check_out_date }) => [
            propertyRef[property_name],
            userRef[guest_name],
            check_in_date,
            check_out_date
        ]);
};

module.exports = insertBookings;