const bcrypt = require('bcrypt');
const {db} = require("../util/db");


const findUserByEmail = (email) => {
    return db.user.findUnique({
        where: {
            email,
        },
    });
}

const createUser = (user) => {
    user.password = bcrypt.hashSync(user.password, process.env.SALT);
    return db.user.create({
        data: user,
    });
}

const findUserById = (id) => {
    return db.user.findUnique({
        where: {
            id,
        },
    });
}


module.exports = {
    findUserByEmail,
    createUser,
    findUserById
}
