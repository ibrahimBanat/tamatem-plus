
const usersSchema = {
    body: {
        type: "object",
        properties: {
            email: {
                type: "string"
            },
            password: {
                type: "string"
            }
        }
    }
}


module.exports = {
    usersSchema
}
