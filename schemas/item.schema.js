const {paginationSchema} = require("./pagination.schema");

const itemBodySchema = {
    name: {
        "type": "string",
        "description": "Name of the item (optional)"
    },
    price: {
        type: "number",
        description: "Price of the item (optional)"
    },
    description: {
        type: "string",
        description: "Description of the item (optional)"
    },
    media_id: {
        type: "integer",
        description: "ID of the associated media (optional)"
    }
}

const createItemSchema = {
    headers: {
        type: "object",
        required: ["Content-Type"],
        properties: {
            'Content-Type' : {
                type: 'string',
                enum: ['application/json']
            }
        }
    },
    body: {
        type: "object",
        properties: {
            ...itemBodySchema
        }
    }
}

const updateItemSchema = {
    type: "object",
    params: {
        type: "object",
        required: ["id"],
        additionalProperties: false,
        properties: {
            id: {
                type: "integer",
                description: ""
            }
        }
    },
    headers: {
        type: "object",
        required: ["Content-Type"],
        properties: {
            'Content-Type' : {
                type: 'string',
                enum: ['application/json']
            },
            authorization: {
                type: "string",
                description: "Authorization header with a valid token"
            }
        }
    },
    body: {
        type: "object",
        additionalProperties: false,
        properties: {
            ...itemBodySchema,
        }
    }
}

const itemDetailsSchema = {
    params: {
        type: "object",
        required: ["id"],
        additionalProperties: false,
        properties: {
            id: {
                type: "integer",
            }
        }
    }
}
const listItemsSchema = {
    ...paginationSchema,
    headers: {
        type: "object",
        required: ["Content-Type"],
        properties: {
            'Content-Type' : {
                type: 'string',
                enum: ['application/json']
            },
        }
    },
}

const deleteItemSchema = {
    params: {
        type: "object",
        required: ["id"],
        additionalProperties: false,
        properties: {
            id: {
                type: "integer",
            }
        }
    }
}

module.exports = {
    createItemSchema,
    updateItemSchema,
    itemDetailsSchema,
    listItemsSchema,
    deleteItemSchema
}
