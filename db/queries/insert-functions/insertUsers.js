function insertUsers(users) {
    return users.map(({first_name, surname, email, phone_number, is_host, avatar}) => [
        first_name, 
        surname, 
        email, 
        phone_number, 
        is_host, 
        avatar
    ]);
};

module.exports = insertUsers;