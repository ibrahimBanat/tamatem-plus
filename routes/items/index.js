"use strict";

const {createItem, getItemById, listItems, updateItem} = require("../../services/items.services");
const {verifyToken} = require("../../util/jwt");
const {paginate} = require("../../services/pagination.services");

module.exports = async function (fastify, opts) {
    fastify.post('/', async (request, reply) => {
        try {
            const {name, price, description, media_id} = request.body;
            if (media_id) {
                return createItem(name, price, description, media_id);
            }
            return await createItem(name, price, description);
        }catch (e) {
            reply.status(500).send(e)
        }
    })

    fastify.get('/:id', async (request, reply) => {
        try {
            const itemId = parseInt(request.params.id);
            return await getItemById(itemId);
        } catch (e) {
            reply.status(500).send(e);
        }
    })

    fastify.get('/', async (request, reply) => {
        try {
            const page = parseInt(request.query.page) || 1;
            const perPage = parseInt(request.query.perPage) || 10;
            return await paginate(page, perPage);
        } catch (e) {
            reply.status(500).send(e);
        }
    })

    fastify.put('/:id', async (request, reply) => {
        try {
            try {
                const verifiedToken = await verifyToken(request.headers.authorization);
            } catch (e) {
                return reply.status(401).send(e);
            }
            try {
                const itemId = parseInt(request.params.id);
                return await updateItem(itemId, request.body);
            }catch (e) {
                reply.status(422).send(e);
            }
        } catch (e){
            reply.status(500).send(e)
        }

    })
}
