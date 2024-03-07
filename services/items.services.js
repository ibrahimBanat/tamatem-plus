const { db } = require('../util/db');

const createItem = async(item_name, item_price, item_description, media_id=null) => {
    return db.item.create({
        data: {
            item_name: item_name,
            item_price: item_price,
            item_description: item_description,
            media_id: media_id
        }
    });
}

const getItemById = async (itemId) => {
    return db.item.findUnique({
        where: {
            id: itemId
        },
        include: {
            media: true
        }
    });
}

const listItems = async () => {
    return db.item.findMany({
        include: {
            media: true
        }
    });
}

module.exports = {
    createItem,
    getItemById,
    listItems
}
