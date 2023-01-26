import { secret } from '../config/config.js';
import jwt from 'jsonwebtoken';

export function verifyToken(req, res, next) {

    const token = req.headers['x-access-token'];

    if(!token){
        return res.json({
            auth: false,
            message: 'User is not logged in'
        });
    }
    const decoded = jwt.verify(token, secret);

    req.userId = decoded.id;
    next();
}