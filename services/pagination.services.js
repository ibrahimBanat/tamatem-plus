const {listItems} = require("./items.services");


const paginate = async (page, pageSize) => {
    const { items, totalCount } = await listItems(page, pageSize);
    const {
        totalPages,
        hasNextPage,
        hasPreviousPage
    } = pager(totalCount, pageSize, page);

    return {
        items,
        totalCount,
        totalPages,
        currentPage: page,
        pageSize,
        hasNextPage,
        hasPreviousPage,
    }
}

const pager = (totalCount, pageSize, page) => {
    const totalPages = Math.ceil(totalCount / pageSize);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;
    return {
        totalPages,
        hasNextPage,
        hasPreviousPage
    }
}


module.exports = {
    paginate
}
