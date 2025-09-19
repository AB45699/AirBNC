function createUsersRef(users) {
    let usersRefObj = {};

    users.forEach(({first_name, surname, user_id }) =>{
        const hostName = `${first_name} ${surname}`;
        usersRefObj[hostName] = user_id;
    });

    return usersRefObj;
}

function formatUsers(users, userRef) {
    return users.map(({ name, property_type, location, price_per_night, description, host_name}) => [
        
        userRef[host_name], 
        name,
        location, 
        property_type, 
        price_per_night, 
        description

        ]
    )
}

module.exports = { createUsersRef, formatUsers };