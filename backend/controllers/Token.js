import jwt from 'jsonwebtoken';

export const generateRefreshToken = (nick, bio, name) => {
    return jwt.sign({ nick, bio, name }, process.env.JWT_SECRET_KEY, {
        expiresIn: '864000s',
    });
};
export const generateAccessToken = (nick, bio, name, avatar) => {
    return jwt.sign(
        { nick, bio, name, avatar },
        process.env.JWT_SECRET_ACCESS_KEY,
        {
            expiresIn: '15s',
        }
    );
};
