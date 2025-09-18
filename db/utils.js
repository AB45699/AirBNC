function createUsersRef(users) {
    let usersRefObj = {};
    if (users.length === 0) return {};

    for (const user of users) {
        const fullname = user["first_name"] + " " + user["surname"];
        usersRefObj[fullname] = user["user_id"]
    }
    return usersRefObj;
}

module.exports = createUsersRef;