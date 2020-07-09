const bcrypt = require('bcrypt');
const { Err } = require('../middlewares');
const { BCRYPT_SALT } = require('../config/env');

class Crypto {
    static hashPassword(plainPassword) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(plainPassword, BCRYPT_SALT, function (err, hash) {
                return err ? reject(new Err({
                    status: 500,
                    name: 'HashFailed',
                    message: err.message
                })) : resolve(hash);
            });
        });
    }

    static comparePassword(plainPassword, hashPassword) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(plainPassword, hashPassword, function (err, result) {
                return err ? reject(new Err({
                    status: 401,
                    name: 'Unauthorized',
                    message: err.message
                })) : resolve(result);
            });
        });
    }
}

module.exports = Crypto;
