const { UserModel, SignInValidator } = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');

module.exports = class SignIn {

    // User signin
    static async login(req, res) {
        try {
           // validate inputs
           const error = await SignInValidator(req.body);
           if (error.message) res.status(400).send(error.message);

           // check if email exist
           const user = await UserModel.findOne({ email: req.body.email });
           if (!user) res.status(404).json({ msg: `No account exist for this email`, code: 404 });
           
           // check password
           const password = await bcrypt.compare(req.body.password, user.password);
           if (!password) res.status(404).json({ msg: `Password validation error`, code: 404 });

           jwt.sign({user}, config.server.token, {expiresIn: '10h'}, (error, token) => {
                if (error) res.status(403).json({ msg: `Token authorizatin error`, code: 403 });
                res.status(200).json({ msg: `User signed in`, code: 200, obj: token });
           }); 
        } catch (error) {
            return res.status(500).json({ msg: `Sign in process failed`, code: 500 });
        }
    }

    // User signin
    static async logout(req, res) {
        try {
            jwt.verify(req.token, config.server.token, (error, authData) => {
                if (error) res.status(403).json({ msg: `Invalid access request`, code: 403 });
                res.status(200).json({ msg: `User is authorized`, code: 200, obj: authData }); 
            })
        } catch (error) {
            return res.status(500).json({ msg: `Contact creation process failed`, code: 500 });
        }
    }

}