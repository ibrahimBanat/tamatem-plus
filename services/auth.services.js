const {tokenHash} = require("../util/token-hash");
const {db} = require("../util/db");

const addRefreshTokenToWhitelist = ({ jwtID, refreshToken, userId }) => {
    return db.refreshToken.create({
        data: {
            id: jwtID,
            hashedToken: tokenHash(refreshToken),
            userId
        },
    });
}

const findRefreshTokenById = (id) => {
    return db.refreshToken.findUnique({
        where: {
            id,
        },
    });
}

// soft delete tokens after usage.
const deleteRefreshToken = (id) => {
    return db.refreshToken.update({
        where: {
            id,
        },
        data: {
            revoked: true
        }
    });
}

const revokeTokens = (userId) => {
    return db.refreshToken.updateMany({
        where: {
            userId
        },
        data: {
            revoked: true
        }
    });
}

module.exports = {
    addRefreshTokenToWhitelist,
    findRefreshTokenById,
    deleteRefreshToken,
    revokeTokens
};
