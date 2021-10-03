const { RoomModel, RoomValidator } = require('../models/room');
const jwt = require('jsonwebtoken');
const config = require('./../config/config');

module.exports = class Room {

    // Create
    static async createNewRoom(req, res) {
        try {
            jwt.verify(req.token, config.server.token);

            // validate inputs
            const error = await RoomValidator(req.body);
            if (error.message) return res.status(400).send(error.message);

            const room = await new RoomModel(req.body).save();

            if (room) return res.status(200).json({ msg: `Room have been added successfully`, code: 200, obj: room });
            return res.status(404).json({ msg: `Room adding failed`, code: 404 });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: `Room adding process failed`, code: 500 });
        }
    }

    // get all
    static async getAllRooms(req, res) {
        try {
            jwt.verify(req.token, config.server.token);

           const rooms = await RoomModel.find({ }).populate({ path: 'creator' });
           if (!rooms) return res.status(404).json({ msg: `Rooms not found`, code: 404 });
           return res.status(200).json({ msg: `Rooms found`, code: 200, obj: rooms });
        } catch (error) {
            return res.status(500).json({ msg: `Rooms access process failed`, code: 500 });
        }
    }

    // get all free
    static async getAllFreeRooms(req, res) {
        try {
            jwt.verify(req.token, config.server.token);

           const rooms = await RoomModel.find({'status': { "$ne": 'booked' } }).populate({ path: 'creator' });
           if (!rooms) return res.status(404).json({ msg: `Rooms not found`, code: 404 });
           return res.status(200).json({ msg: `Rooms found`, code: 200, obj: rooms });
        } catch (error) {
            return res.status(500).json({ msg: `Rooms access process failed`, code: 500 });
        }
    }
}