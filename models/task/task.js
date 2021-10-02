const mongoose = require('mongoose');
const yup = require('yup');

//Task Schema
const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        minlength: 3,
        maxlength: 100
    },
    description: {
        type: String,
        minlength: 3,
        maxlength: 150
    },
    startDate: {
        type: Date,
        require: true
    },
    endDate: {
        type: Date,
        require: true
    },
    priority: {
        type: String,
        require: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

// yup validation
const TaskValidator = (task) => {
    let schema = yup.object().shape({
        title: yup.string().required().min(3, 'Task title should be a little descriptive').max(100, 'Title too long'),
        description: yup.string().min(3, 'Task description should be a little meaningful').max(400, 'Too much description'),
        startDate: yup.date().required('Task start date is required'),
        endDate: yup.date().required('Task end date is required'),
        priority: yup.string().min(3, 'Invalid priority value').max(7, 'Invalid priority value'),
        creator: yup.string().required('Task creator is required')
    })

    return schema.validate(task).then(task => task).catch(error => {
        return {
            message: error.message
        }
    });
}

// exports
exports.TaskModel = new mongoose.model('Task', TaskSchema);
exports.TaskValidator = TaskValidator;