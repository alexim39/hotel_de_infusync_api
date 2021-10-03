const mongoose = require('mongoose');
const yup = require('yup');

//Schema
const ClientSchema = new mongoose.Schema({
    names: {
        type: String,
        require: true,
        minlength: 3,
        maxlength: 100
    },
    email: {
        type: String,
        minlength: 3,
        maxlength: 150,
        require: true
    },
    phone: {
        type: String,
        require: true,
        minlength: 11,
        maxlength: 11
    },
    address: {
        type: String,
        require: true,
    },
    arrivalDate: {
        type: Date,
        require: true,
    },
    departureDate: {
        type: Date,
        require: true,
    },
    people: {
        type: Number,
        default: 1
    },
    room: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Room',
        require: true
    },
    services: {
        type: String,
    },
    status: {
        type: String,
        default: 'Pending'
    },
    payment: {
        type: String,
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    modifyDate: {
        type: Date,
        default: Date.now
    },
    coment: {
        type: String,
        minlength: 3,
        maxlength: 355,
        require: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        require: true
    }
})

// yup validation
const ClientValidator = (clientObj) => {
    let schema = yup.object().shape({
        names: yup.string().required().min(3, 'Names should be a little descriptive').max(100, 'Names is too long'),
        email: yup.string().required().email('Email address is invalid'),
        phone: yup.string().min(11, 'Phone number is invalid').max(11, 'Phone number is invalid').required('Phone number is valid'),
        coment: yup.string().min(3, 'Comment is too short').max(350, 'Comment is too long')
    })

    return schema.validate(clientObj).then(clientObj => clientObj).catch(error => {
        return {
            message: error.message
        }
    });
}

// exports
exports.ClientModel = new mongoose.model('Client', ClientSchema);
exports.ClientValidator = ClientValidator;