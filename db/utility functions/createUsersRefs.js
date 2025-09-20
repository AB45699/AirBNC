function createUsersRef(users) {
    let usersRefObj = {};

    users.forEach(({first_name, surname, user_id }) =>{
        const hostName = `${first_name} ${surname}`;
        usersRefObj[hostName] = user_id;
    });

    return usersRefObj;
}

function formatUsers(users, userRef) {
    return users.map(({ host_name}) => [
        
        userRef[host_name] 

        ]
    )
}

module.exports = { createUsersRef, formatUsers };