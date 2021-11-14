import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const Authorization = req.header('authorization');

    if (!Authorization) {
        const err = new Error("Unauthorized!");
        err.statusCode = 400;
        return next(err);
    }
    //Get token
    const token = Authorization.replace('Bearer ', '');

    // Verify token
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    req.user = { userId };

    next();
}