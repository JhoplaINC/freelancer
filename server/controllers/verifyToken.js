import { secret } from '../config/config.js';
import jwt from 'jsonwebtoken';

export function verifyToken(req, res, next) {

    const token = req.headers['x-access-token'];

    if(!token){
        return res.status(401).json({
            auth: false,
            message: 'You need to login first'
        });
    }

    const decoded = jwt.verify(token, secret);

    req.userId = decoded.id;
    next();
}