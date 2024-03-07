"use strict";


const {error} = require("tap");
const {findUserByEmail, createUser} = require("../../services/users.services");
const { v4: uuidv4 } = require('uuid');
const {generateTokens} = require("../../util/jwt");
const {addRefreshTokenToWhitelist} = require("../../services/auth.services");

module.exports = async function (fastify, opts) {
    fastify.post('/', async (request, reply) => {
        try {
            const {email, password} = request.body;

            const existingUser = await findUserByEmail(email);

            if (existingUser) {
                reply.status(400);
                reply.send({"error": "Email already in use."});
                return;
            }
            const user = await createUser({ email, password });
            const jwtID = uuidv4();
            const { accessToken, refreshToken } = generateTokens(user, jwtID);
            await addRefreshTokenToWhitelist({ jwtID, refreshToken, userId: user.id });
            reply.send({
                accessToken,
                refreshToken,
            });
        } catch (e) {
            reply.code(500).send(e)
        }
    })
}
