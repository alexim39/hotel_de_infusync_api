const mongoose = require('mongoose');
const yup = require('yup');

//Task Schema
const TeamSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minlength: 3,
        maxlength: 100
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        require: false
    }],
    description: {
        type: String,
    },
    createDate: {
        type: Date,
        require: true,
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
    },
    sharedTasks: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Task'
    }]
})

// yup validation
const TeamValidator = (team) => {
    let schema = yup.object().shape({
        name: yup.string().required().min(3, 'Team name should be a little descriptive').max(100, 'Name too long'),
        description: yup.string().min(3, 'Team description should be a little meaningful').max(400, 'Too much description'),
        members: yup.array(),
        creator: yup.string().required('Team creator is required')
    })

    return schema.validate(team).then(team => team).catch(error => {
        return {
            message: error.message
        }
    });
}

// exports
exports.TeamModel = new mongoose.model('Team', TeamSchema);
exports.TeamValidator = TeamValidator;