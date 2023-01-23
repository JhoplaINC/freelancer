import { pool } from '../config/dbconfig.js';
import { secret } from '../config/config.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const saltRounds = 10;

const registerRequest = async (req, res) => {
    try {
        const {name, lastname, email, rol, password} = req.body;
        const passHash = await bcrypt.hash(password, saltRounds);
        const [newUser] = await pool.query(`
                INSERT INTO users 
                (user_rol_id, user_email, user_password, user_name, user_lastname, user_profile_img_name)
                values 
                (?, ?, ?, ?, ?, ?)
            `, [rol, email, passHash, name, lastname, 'profile-img-default.png']);
        
            res.send('registrao');
    } catch (error) {
        console.log(error);
    }
}

const loginRequest = async (req, res) => {
    try {
        const {email, password} = req.body;
        const [user] = await pool.query(`SELECT user_id, user_name, user_password FROM users WHERE user_email = ?`, [email]);
        if(user.length === 0) return res.send('No matching user with that email');

        const dbPassword = user[0].user_password;
        let userId = user[0].user_id;
        const matchingPasswords = await bcrypt.compare(password, dbPassword);
    
        if(matchingPasswords){
            const token = jwt.sign({id: userId}, secret, {
                expiresIn: 60 * 60 * 4
            });
            
            res.json({auth: true, token});
        } else {
            res.send('No matching pass');
        }
    } catch (error) {
        console.log(error)
    }
}

const thirdUserProfile = async (req, res) => {
    try {
        const [user_data] = await pool.query(`
            SELECT u.user_id, u.user_name, u.user_lastname, u.user_second_name, 
                u.user_second_lastname, u.user_email, u.user_nick, u.user_profile_img_filename, r.rol_name
            FROM users AS u
            LEFT JOIN roles AS r
            ON u.user_rol_id = r.rol_id
            WHERE u.user_nick = ?
        `, [req.params.user_nick]);
        res.send(user_data[0]);
    } catch (error) {
        console.log(error);
    }
}

const userProfile = async (req, res) => {
    try {
        const [user_data] = await pool.query(`
            SELECT u.user_id, u.user_name, u.user_lastname, u.user_second_name, 
                   u.user_second_lastname, u.user_email, u.user_nick, u.user_profile_img_filename, r.rol_name
            FROM users AS u
            LEFT JOIN roles AS r
            ON u.user_rol_id = r.rol_id
            WHERE u.user_id = ?
        `, req.userId);

        res.send(user_data);
    } catch (error) {
        console.log(error)
    }
}

const updateProfile = async (req, res) => {
    try {
        const [newUser] = await pool.query(`
            UPDATE users
            SET ?
            WHERE user_id = ?
        `, [req.body, req.userId]);
        res.send(newUser);
    } catch (error) {
        console.log(error);
    }
}

const updateUserImg = async (req, res) => {
    try {
        let img_name = req.file.originalname;
        let img_size = req.file.size;
        let img_type = req.file.mimetype;
        let img_filename = req.file.filename;
        const [newUser] = await pool.query(`
            UPDATE users
            SET user_profile_img_name = ?,
            user_profile_img_size = ?,
            user_profile_img_type = ?,
            user_profile_img_filename = ?
            WHERE user_id = ?
        `, [img_name, img_size, img_type, img_filename, req.userId]);
        res.send(newUser);
    } catch (error) {
        console.log(error)
    }
}

export { registerRequest, loginRequest, userProfile, thirdUserProfile, updateProfile, updateUserImg }