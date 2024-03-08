"use strict";

const path = require('path');
const uploadDir = path.join('public/images');
const fs = require('fs');
const {createMedia} = require("../../services/media.services");
const { pipeline } =  require('stream');
const util = require('util');
const pump = util.promisify(pipeline);


module.exports = async function(fastify, opts) {
    fastify.post('/', async (request, reply) => {
        try {
            const parts = request.files();
            const mediaGroup = [];
            for await (const part of parts) {
                if (part.file) {
                    const extension = path.extname(part.filename);
                    const filename = Date.now() + '-' + Math.floor(Math.random() * 1000) + extension;
                    const filePath = path.join(uploadDir, filename);
                    await pump(part.file, fs.createWriteStream(filePath));
                    const media = await createMedia('image', filename, filePath, extension);
                    mediaGroup.push(media);
                }
            }
            return mediaGroup;

        } catch (e) {
            reply.status(500).send("Internal Server Error");
        }
    })
}
