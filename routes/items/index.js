"use strict";

const {createItem, getItemById, listItems} = require("../../services/items.services");
const {associateMediaWithItem} = require("../../services/media.services");
module.exports = async function (fastify, opts) {
    fastify.post('/:id/media', async (request, reply) => {
        try {
            const body = request.body;
        } catch (e) {

        }
    })

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
            const items = await listItems();
            return items;
        } catch (e) {

        }
    })
}
