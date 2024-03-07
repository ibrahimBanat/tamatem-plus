"use strict";

const {listImages} = require("../../services/media.services");
module.exports = async function (fastify, otps) {
    fastify.get('/', async (request, reply) => {
        try {
            const images = await listImages();
            return images;
        } catch (e) {
            reply.status(500).send(e);
        }
    })
}
