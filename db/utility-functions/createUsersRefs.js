function createUsersRef(users) {
    const usersRefObj = {};

    users.forEach(({first_name, surname, user_id }) =>{
        if (first_name !== undefined && surname !== undefined && user_id !== undefined) {
            const hostName = `${first_name} ${surname}`;
            usersRefObj[hostName] = user_id;
        }
    });

    return usersRefObj;
};

module.exports = createUsersRef;