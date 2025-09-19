function createHostsRef(users) {
    let hostsRefObj = {};

    users.forEach(({first_name, surname, user_id, is_host}) =>{
        if (is_host) {
            const hostName = `${first_name} ${surname}`;
            hostsRefObj[hostName] = user_id;
        }
    });

    return hostsRefObj;
}

module.exports = createHostsRef;