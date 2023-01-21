import bcrypt, { hashSync } from 'bcryptjs';

export const bcrypt = async (textplain) => {
    const hash = await bcrypt.hash(textplain, 10);
    return hash;
}

export const compare = async (passwordPlain, hashPassword) => {
    return await bcrypt.compare(passwordPlain, hashPassword);
}