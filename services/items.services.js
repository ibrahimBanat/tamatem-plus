const { db } = require('../util/db');
const {checkMediaExist} = require("./media.services");
const fastify = require("fastify");

const createItem = async(item_name, item_price, item_description, media_id=null) => {
    return db.item.create({
        data: {
            item_name: item_name,
            item_price: item_price,
            item_description: item_description,
            media_id: media_id
        },
        include: {
            media: true
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

const listItems = async (page, pageSize) => {
    const skip = (page - 1) * pageSize;
    const items =  await db.item.findMany({
        include: {
            media: true
        },
        skip,
        take: pageSize
    });
    const totalCount = await db.item.count();
    return { items, totalCount };
}

const updateItem = async (id, newData) => {
    try {
        if (newData.media_id !== undefined) {
            const mediaExist = await checkMediaExist(newData.media_id);
            if (!mediaExist) {
                throw new Error("Media id is not found");
            }
            return await db.item.update({
                where: {id: id},
                data: {
                    item_name: newData.name,
                    item_price: newData.price,
                    item_description: newData.description,
                    media: {connect: {id: newData.media_id}}
                },
                include: {
                    media: true
                }
            });
        }

        return await db.item.update({
            where: {id: id},
            data: {
                item_name: newData.name,
                item_price: newData.price,
                item_description: newData.description,
            },
            include: {
                media: true
            }
        });
    } catch (error) {
        console.error("Error updating item:", error);
        throw new Error("Failed to update item.");
    }
}

const deleteItem = (id) => {
    return db.item.delete({
        where: {id: id}
    })
}
module.exports = {
    createItem,
    getItemById,
    listItems,
    updateItem,
    deleteItem
}
