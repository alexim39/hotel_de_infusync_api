const { UserModel, SignUpValidator } = require('../../models/user');
const bcrypt = require('bcryptjs');
const {EmailClass} = require('./../email/email')

module.exports = class SignUp {

    // User singup
    static async register(req, res) {
        try {
           // validate inputs
           const error = await SignUpValidator(req.body);
           if (error.message) res.status(400).send(error.message);

           // check if tnc is checked
           if (req.body.tnc === false) return res.status(400).json({ msg: `Please check the terms and condition box to continue`, code: 400 });

           // check if user already exist
           const userExist = await UserModel.findOne({ email: req.body.email });
           if (userExist) res.status(400).json({ msg: `This email already exist, you can reset your password to continue`, code: 400 });

           // hash password
           const salt = await bcrypt.genSalt(10);
           const hash = await bcrypt.hash(req.body.password, salt);

           const user = await new UserModel({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: hash,
                tnc: req.body.tnc
            }).save();

            if (user) {
                // send activation email
                const email = new EmailClass();
                email.sendAccountActivationLink(user);
                res.status(200).json({ msg: `Account created`, code: 200, obj: user });
            } else {
                res.status(404).json({ msg: `Account creation failed`, code: 404 });
            }  
        } catch (error) {
            return res.status(500).json({ msg: `Sign up process failed`, code: 500 });
        }
    }
}