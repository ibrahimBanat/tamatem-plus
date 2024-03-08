
const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
    return jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: '15m',
    });
}

const generateRefresherToken = (user, jwtID) => {
    return jwt.sign({
        userId: user.id,
        jwtID
    }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: '8h',
    });
}

const generateTokens = (user, jwtID) => {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefresherToken(user, jwtID);

    return {
        accessToken,
        refreshToken,
    };
}


const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decode) => {
            if (err) return reject(err);
            resolve(decode);
        })
    })
}


module.exports = {
    generateAccessToken,
    generateRefresherToken,
    generateTokens,
    verifyToken
}
