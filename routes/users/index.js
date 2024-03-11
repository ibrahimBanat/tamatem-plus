"use strict";


const {error} = require("tap");
const {findUserByEmail, createUser, findUserById} = require("../../services/users.services");
const {v4: uuidv4} = require('uuid');
const {generateTokens, verifyToken, verifyRefreshToken} = require("../../util/jwt");
const {addRefreshTokenToWhitelist, findRefreshTokenById} = require("../../services/auth.services");
const {usersSchema} = require("../../schemas/users.schema");
const {tokenHash} = require("../../util/token-hash");
const bcrypt = require("bcrypt");

module.exports = async function (fastify, opts) {
    fastify.post('/', {schema: usersSchema}, async (request, reply) => {
        try {
            const {email, password} = request.body;

            const existingUser = await findUserByEmail(email);

            if (existingUser) {
                reply.status(400);
                reply.send({"error": "Email already in use."});
                return;
            }
            const user = await createUser({email, password});
            const jwtID = uuidv4();
            const {accessToken, refreshToken} = generateTokens(user, jwtID);
            await addRefreshTokenToWhitelist({jwtID, refreshToken, userId: user.id});


            reply.cookie('baz', 'baz')
                .send({
                    accessToken,
                    refreshToken,
                });
        } catch (e) {
            reply.code(500).send(e)
        }
    })

    fastify.post('/login', async function (request, reply) {
        const {email, password} = request.body;
        const existingUser = await findUserByEmail(email);
        if (!existingUser) {
            throw fastify.httpErrors.unauthorized();
        }

        if (!bcrypt.compareSync(password, existingUser.password)) {
            throw fastify.httpErrors.unauthorized();
        }

        const jwtID = uuidv4();
        const {accessToken, refreshToken} = generateTokens(existingUser, jwtID);
        await addRefreshTokenToWhitelist({jwtID, refreshToken, userId: existingUser.id});
        reply.cookie('refreshToken', refreshToken)
            .send({
                accessToken,
                refreshToken,
            });
    })

    fastify.post('/access', async function (request, reply) {
        try {
            if (!request?.cookies?.refreshToken) {
                throw fastify.httpErrors.unauthorized()
            }
            const ref = request.cookies.refreshToken;
            const token = await verifyRefreshToken(ref)
            const isTokenFound = findRefreshTokenById(token.jwtID)
            if (!isTokenFound) {
                throw fastify.httpErrors.badRequest('Invalid Token');
            }
            const user = findUserById(token.id);

            const {accessToken, refreshToken} = generateTokens(user, token.jwtID);

            return {
                accessToken
            }
        }catch (e) {
            throw fastify.httpErrors.badRequest(e);
        }
    })
}
