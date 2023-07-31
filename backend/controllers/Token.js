import jwt from 'jsonwebtoken';

export const generateRefreshToken = (email) => {
    return jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
        expiresIn: '864000s',
    });
};
export const generateAccessToken = (email) => {
    return jwt.sign({ email }, process.env.JWT_SECRET_ACCESS_KEY, {
        expiresIn: '15s',
    });
};
