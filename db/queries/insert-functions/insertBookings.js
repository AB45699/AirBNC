function insertBookings(propertyRef, userRef, bookingsData) {
    return bookingsData.map(({property_name, guest_name, check_in_date, check_out_date})=>[
        propertyRef[property_name], 
        userRef[guest_name], 
        check_in_date, 
        check_out_date
    ])
};

module.exports = insertBookings;