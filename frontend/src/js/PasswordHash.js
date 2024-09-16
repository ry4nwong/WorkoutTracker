import bcrypt from 'bcryptjs-react'

const salt = bcrypt.genSaltSync(10);

export const hashPassword = (password) => {
    return bcrypt.hashSync(password, salt);
};