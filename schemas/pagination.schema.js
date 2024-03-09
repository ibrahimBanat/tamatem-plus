

const paginationSchema = {
    querystring: {
        type: "object",
        properties: {
            page: {
                type: "integer",
                minimum: 1,
                description: "Page number for pagination (optional, defaults to 1)",
            },
            perPage: {
                type: "integer",
                description: "Items per page for pagination (optional, defaults to 10)",
                minimum: 1
            }
        }
    }
}


module.exports = {
    paginationSchema
}
