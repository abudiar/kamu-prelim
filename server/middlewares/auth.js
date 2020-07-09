const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/env');
const Err = require('./err');
const { User, Order, OrderItem } = require('../models');

class Auth {
    static decodeToken(access_token) {
        return new Promise((resolve, reject) => {
            console.log('hello',access_token)
            if (!access_token)
                throw new Err({
                    name: 'TokenNull',
                    status: 401,
                    message: 'You do not have the required permissions!'
                });
            jwt.verify(access_token, JWT_KEY, function (err, decoded) {
                if (decoded.UserId)
                    resolve(decoded);
                else
                    reject(new Err({
                        name: 'TokenInvalid',
                        status: 401,
                        message: 'You do not have the required permissions!'
                    }));
            });
        });
    }

    static authenticate(req, res, next) {
        const { access_token } = req.headers;
        Auth.decodeToken(access_token)
            .then((decoded) => {
                req['decoded'] = decoded;
                next();
            })
            .catch(next);
    }

    static authorizeOrderItem(req, res, next) {
        const { 
            decoded: { CustomerId },
            params: { id }
         } = req;
        OrderItem.findOne({
            where: { id },
            include: [{ model: Order, where: { CustomerId }}]
        })
            .then(data => {
                if (data == null || data.length == 0) 
                    throw new Err({
                        name: 'AuthorizationError',
                        status: 401,
                        message: 'You do not have the required permissions!'
                    });
                else
                    next();
            })
            .catch(next);
    }

    static authorizeOrder(req, res, next) {
        const { 
            decoded: { CustomerId },
            params: { id }
         } = req;
        Order.findOne({
            where: { id, CustomerId }
        })
            .then(data => {
                if (data == null || data.length == 0) 
                    throw new Err({
                        name: 'AuthorizationError',
                        status: 401,
                        message: 'You do not have the required permissions!'
                    });
                else
                    next();
            })
            .catch(next);
    }
}

module.exports = Auth;