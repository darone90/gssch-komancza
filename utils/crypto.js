const {hash, compare} = require('bcrypt');
const {promisify} = require('util');
const scrypt = promisify(require('crypto').scrypt);
const randomBytes = promisify(require('crypto').randomBytes);
const {createCipheriv, createDecipheriv} = require('crypto');
const {algorithm, password, iterations, salt} = require('../config.js');

const coding = async (toCode) => {
    try {
        const key = await scrypt(password, salt, iterations);
        const iv = await randomBytes(16);
    
        const cipher = createCipheriv(algorithm, key, iv);
        let encrypted = cipher.update(toCode, 'utf-8', 'hex');
        encrypted += cipher.final('hex');

        return {
             encrypted,
            iv: iv.toString('hex')
        }
    } catch (err) {
        throw new Error('coding error', err)
    }
    
};

const decoding = async (toDecode, iv) => {
    try {
        const key = await scrypt(password, salt, iterations);
        const ivd = Buffer.from(iv, 'hex');

        const decipher = createDecipheriv(algorithm, key, ivd);
        let decrypted = decipher.update(toDecode, 'hex', 'utf-8');
        decrypted += decipher.final('utf-8');

        return decrypted;
    } catch (err) {
        throw new Error('decoding error', err);
    }
    
};

const hashHandle = async (password) => {
    try {
        const hashOne = await hash(password, 10);
        return hashOne;
    } catch (err) {
        throw new Error('hash error', err);
    }
};

const compareHash = async (givedPass, oldPass) => {
    try {
        const isUserCorrect = await compare(givedPass, oldPass);
        return isUserCorrect;
    } catch (err) {
        throw new Error('hash compare error', err)
    }
}


module.exports = {
    hashHandle,
    compareHash,
    coding,
    decoding
}