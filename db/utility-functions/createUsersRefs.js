function createUsersRef(users) {
    let usersRefObj = {};

    users.forEach(({first_name, surname, user_id }) =>{
        const hostName = `${first_name} ${surname}`;
        usersRefObj[hostName] = user_id;
    });

    return usersRefObj;
};

module.exports = createUsersRef;