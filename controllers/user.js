const { UserModel, SignInValidator } = require('./../models/user');
const jwt = require('jsonwebtoken');
const config = require('./../config/config');

module.exports = class User {

    // get a user
    static async getUser(req, res) {
        try {
            jwt.verify(req.token, config.server.token, (error, authData) => {
                if (error) return res.status(403).json({ msg: `Invalid access request`, code: 403 });
                return res.status(200).json({ msg: `User is authorized`, code: 200, obj: authData.user }); 
            })
        } catch (error) {
            return res.status(500).json({ msg: `User access process failed`, code: 500 });
        }
    }

    // get all users
    static async getUsers(req, res) {
        try {
           const users = await UserModel.find({ });
           if (!users) return res.status(404).json({ msg: `User access failed`, code: 404 });
           return res.status(200).json({ msg: `users found`, code: 200, obj: users });
        } catch (error) {
            return res.status(500).json({ msg: `User access process failed`, code: 500 });
        }
    }

}