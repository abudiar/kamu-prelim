const { User } = require('../models');
const { Err } = require('../middlewares');
const { JWT_KEY } = require('../config/env');
const { Crypto } = require('../helpers');
const jwt = require('jsonwebtoken');

class UserController {
    static register(req, res, next) {
        const { first_name, last_name, username, email, password, phone, color } = req.body;
        User.findOne({ where: { username } })
            .then((user) => {
                if (!user)
                    return User.findOne({ where: { email } });
                else
                    throw new Err({
                        name: 'AlreadyExists',
                        status: 400,
                        message: 'User with that username already exists!'
                    });
            })
            .then((user) => {
                if (!user)
                    return Crypto.hashPassword(password);
                else
                    throw new Err({
                        name: 'AlreadyExists',
                        status: 400,
                        message: 'User with that email already exists!'
                    });
            })
            .then((password) => {
                return User.create(
                    { first_name, last_name, username, email, password, phone, color }
                );
            })
            .then((user) => {
                if (!user)
                    throw new Err({
                        name: 'ConstraintError',
                        status: 400,
                        message: 'Constraint Error (Incorrect Format)'
                    });
                res.status(201).json({
                    access_token: jwt.sign({
                        UserId: user.id
                    }, JWT_KEY)
                });
            })
            .catch(next);
    }

    static login(req, res, next) {
        const { username, password } = req.body;
        console.log(req.body)
        if (!password || !username) throw new Err({
            name: 'CredentialsNull',
            status: 401,
            message: 'Username and password are required!'
        })
        let userData;
        User.findOne({ where: { username } })
            .then((user) => {
                if (!user)
                    throw new Err({
                        name: 'WrongCredentials',
                        status: 401,
                        message: 'Wrong username and password combination!'
                    })
                userData = user;
                return Crypto.comparePassword(password, user.dataValues.password);
            })
            .then(success => {
                if (!success)
                    throw new Err({
                        name: 'WrongCredentials',
                        status: 401,
                        message: 'Wrong username and password combination!'
                    })
                res.status(200).json({
                    access_token: jwt.sign({
                        UserId: userData.dataValues.id,
                    }, JWT_KEY)
                });
            })
            .catch(next)
    }

    static getUser(req, res, next) {
        const { decoded: { UserId: id } } = req;
        User.findOne({ where: { id }, attributes: { exclude: ['password'] } })
            .then((user) => {
                if (!user)
                    throw new Err({
                        name: 'NotFound',
                        status: 404,
                        message: 'User not found!'
                    })
                res.status(200).json(user);
            })
            .catch(next)
    }

    static checkUsername(req, res, next) {
        const { username } = req.body;
        console.log(req.body);
        User.findOne({ where: { username } })
            .then((user) => {
                if (!user)
                    res.status(200).json({ exists: false });
                else
                    res.status(200).json({ exists: true });
            })
            .catch(next)
    }
}

module.exports = UserController;