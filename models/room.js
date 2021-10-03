const mongoose = require('mongoose');
const yup = require('yup');

//Schema
const RoomSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minlength: 3,
        maxlength: 100
    },
    price: {
        type: Number,
        require: true
    },
    status: {
        type: String,
        default: 'free'
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    modifyDate: {
        type: Date,
        default: Date.now
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        require: true
    }
})

// yup validation
const RoomValidator = (obj) => {
    let schema = yup.object().shape({
        name: yup.string().required().min(3, 'Names should be a little descriptive').max(100, 'Names is too long'),
        price: yup.number().required('Price is required'),
    })

    return schema.validate(obj).then(obj => obj).catch(error => {
        return {
            message: error.message
        }
    });
}

// exports
exports.RoomModel = new mongoose.model('Room', RoomSchema);
exports.RoomValidator = RoomValidator;