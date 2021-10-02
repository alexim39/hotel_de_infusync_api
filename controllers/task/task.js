const { TaskModel, TaskValidator } = require('./../../models/task/task');

module.exports = class Task {

    // Create task
    static async create(req, res) {
        try{
            // validate inputs
            const error = await TaskValidator(req.body);
            if (error.message) res.status(400).send(error.message);

            const task = await new TaskModel({
                title: req.body.title,
                description: req.body.description,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                priority: req.body.priority,
                creator: req.body.creator
            }).save();

            if (task) res.status(200).json({ msg: `Task created`, code: 200, obj: task });
            res.status(404).json({ msg: `Task creation failed`, code: 404 });
        } catch (error) {
            res.status(500).json({ msg: `Task creation process failed`, code: 500 });
        }

    }

    // Get all task for a user
    static async getTasks(req, res) {
        try {
            const task = await TaskModel.find({ creator: req.params.creatorId });
            if (task.length > 0) res.status(200).json({ msg: `All task found`, code: 200, obj: task });
            res.status(404).json({ msg: `No task found`, code: 404 });
        } catch (error) {
            res.status(500).json({ msg: `Task fetching process failed`, code: 500 });
        }
    }

    // Get specific task for a user
    static async getTask(req, res) {
        try {
            const task = await TaskModel.findById(req.params.taskId);
            if (task) res.status(200).json({ msg: `Task found`, code: 200, obj: task });
            res.status(404).json({ msg: `This task does not exist`, code: 404 });
        } catch (error) {
            res.status(500).json({ msg: `Task fetching process failed`, code: 500 });
        }
    }

    // Update task
    static async update(req, res) {
        try {
            // validate inputs
            const error = await TaskValidator(req.body);
            if (error.message) res.status(400).send(error.message);

            const updatedTask = await TaskModel.findByIdAndUpdate(req.body._id, {
                title: req.body.title,
                description: req.body.description,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                priority: req.body.priority,
                creator: req.body.creator
            }, { new: true });

            if (updatedTask) res.status(200).json({ msg: `Task updated`, code: 200, obj: updatedTask });
            res.status(404).json({ msg: `This task does not exist`, code: 404 });
        } catch (error) {
            res.status(500).json({ msg: `Task update process failed`, code: 500 });
        }
    }

    // Delete task
    static async remove(req, res) {
        try {
            const task = await TaskModel.findByIdAndDelete(req.params.taskId);
            if (task) res.status(200).json({ msg: `Task deleted`, code: 200, obj: task });
            res.status(404).json({ msg: `This task does not exist`, code: 404 });
        } catch (error) {
            res.status(500).json({ msg: `Task removal process failed`, code: 500 });
        }
    }
}