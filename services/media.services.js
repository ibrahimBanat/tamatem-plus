const path = require('path');
const fs = require('fs');
const uploadDir = path.join(__dirname, 'media');
const { db } = require('../util/db');


const createMedia = async (type, name, path, extension = null) => {
    return db.media.create({
        data: {
            type: 'image',
            name: name,
            path: path,
            extension: extension,
        },
    });
}


const associateMediaWithItem = async (itemId, mediaId) => {
    return db.item.update({
        where: {id: itemId},
        data: {
            media: {connect: {id: mediaId}},
        },
    });
}

const listImages = async () => {
    return db.media.findMany();
}

const checkMediaExist = async (media_id) => {
    const mediaExists = await db.media.findUnique({
        where: { id: media_id }
    });

    return !!mediaExists;
}
module.exports = {
    createMedia,
    associateMediaWithItem,
    listImages,
    checkMediaExist
}
