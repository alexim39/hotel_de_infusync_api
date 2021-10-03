const { ClientModel, ClientValidator } = require('../models/client');
const jwt = require('jsonwebtoken');
const config = require('./../config/config');

module.exports = class Contact {

    // Create
    static async createNewClientBooking(req, res) {
        try {
            jwt.verify(req.token, config.server.token);

            // validate inputs
            const error = await ClientValidator(req.body);
            if (error.message) return res.status(400).send(error.message);

            const booking = await new ClientModel(req.body).save();

            if (booking) return res.status(200).json({ msg: `Booking have been made successfully`, code: 200, obj: booking });
            return res.status(404).json({ msg: `Client booking failed`, code: 404 });
        } catch (error) {
            return res.status(500).json({ msg: `Booking process failed`, code: 500 });
        }
    }

    // get all
    static async getClients(req, res) {
        try {
            jwt.verify(req.token, config.server.token);

           const clients = await ClientModel.find({ }).populate({ path: 'creator' });
           if (!clients) return res.status(404).json({ msg: `User not found`, code: 404 });
           return res.status(200).json({ msg: `users found`, code: 200, obj: clients });
        } catch (error) {
            return res.status(500).json({ msg: `User access process failed`, code: 500 });
        }
    }

    // get a client
    static async getAClient(req, res) {
        try {
            jwt.verify(req.token, config.server.token);

            const client = await ClientModel.findById( req.params.clientId ).populate({ path: 'creator' });
           if (!client) return res.status(404).json({ msg: `Client was not found`, code: 404 });
           return res.status(200).json({ msg: `Client found`, code: 200, obj: client });

        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: `User referer access process failed`, code: 500 });
        }
    }

    // Update
    static async updateClient(req, res) {
        try {
            jwt.verify(req.token, config.server.token);

            console.log(req.body)

            // validate inputs
            const error = await ClientModel(req.body);
            if (error.message) return res.status(400).send(error.message);

            const updatedObj = await ClientModel.findByIdAndUpdate(req.body.id, {
                status: req.body.status,
                payment: req.body.payment,
                modifyDate: new Date(),
            }, { new: true });

            if (updatedObj) return res.status(200).json({ msg: `Code updated`, code: 200, obj: updatedObj });
            return res.status(404).json({ msg: `This code does not exist`, code: 404 });
        } catch (error) {
            return res.status(500).json({ msg: `Code process failed`, code: 500 });
        }
    }

    // Delete
    static async removeClient(req, res) {
        try {
            jwt.verify(req.token, config.server.token);            

            const codes = await ClientModel.findByIdAndDelete(req.params.clientId);
            if (codes) return res.status(200).json({ msg: `Client removed`, code: 200, obj: codes });
            return res.status(404).json({ msg: `This client does not exist`, code: 404 });
        } catch (error) {
            return res.status(500).json({ msg: `Client removal process failed`, code: 500 });
        }
    }

}