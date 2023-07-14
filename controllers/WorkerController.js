import WorkerModel from '../models/Worker.js'
import GroupModel from '../models/Group.js'

export const getWorkers = async (req, res) => {
    try {
        const groupId = req.params.groupId;
        const workers = await WorkerModel.find({ group: groupId })
        res.json(workers)

    } catch(err) {
        console.log(err)
        res.status(404).json({
            message: 'Error get workers'
        })
    }
}

export const createWorker = async (req, res) => {
    try {
        const doc = new WorkerModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            salary: req.body.salary,
            group: req.params.groupId
        })

        const worker = await doc.save()

        await GroupModel.findByIdAndUpdate(req.params.groupId, {
            $push: { workers: worker }
        }, { new: true})

        res.json(worker)
    } catch(err) {
        console.log(err)
        res.status(404).json({
            message: 'Error create worker'
        })
    }
}

export const editWorker = async (req, res) => {
    try {
        const editWorker = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            salary: req.body.salary,
        }

        const worker = await WorkerModel.findByIdAndUpdate(req.params.workerId, editWorker, { new: true})

        if(!worker) {
            return res.status(404).json({
                message: 'worker is not found'
            })
        }

        res.json(worker)
    } catch(err) {
        console.log(err)
        res.status(404).json({
            message: 'Error edit worker'
        })
    }
}

export const deleteWorker = async (req, res) => {
    try {
        const workerId = req.params.workerId
        const worker = await WorkerModel.findByIdAndDelete(workerId)
        if(!worker) {
            return res.stattus(404),json({
                message: 'this worker is not found'
            })
        }

        res.json({
            message: 'success delete worker'
        })

    } catch(err) {
        console.log(err)
        res.status(404).json({
            message: 'Error delete worker'
        })
    }
}