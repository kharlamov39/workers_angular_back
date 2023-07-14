import GroupModel from '../models/Group.js';
import UserModel from '../models/User.js';

export const getGroups = async (req, res) => {
    try {
        const groups = await GroupModel.find({ author: req.userId})

        res.json(groups)

    } catch(err) {
        console.log(err)
        res.status(404).json({
            message: 'Error get groups'
        })
    }
}

export const createGroup = async (req, res) => {
    try {
        const doc = new GroupModel({
            title: req.body.title,
            author: req.userId
        })

        const group = await doc.save()

        await UserModel.findByIdAndUpdate(req.userdId, {
            $push: { groups: group }
        }, { new: true})

        res.json(group)

    } catch(err) {
        console.log(err)
        res.status(404).json({
            message: 'Error for create group'
        })
    }
}

export const deleteGroup = async (req, res) => {
    try {
        const groupId = req.params.groupId

        const group = await GroupModel.findByIdAndDelete(groupId)
        if(!group) {
            return res.status(404).json({
                message: 'Group is not found'
            })
        }

        res.json({
            message: 'success deleteting'
        })

    } catch(err) {
        console.log(err)
        res.status(404).json({
            message: 'Error delete group'
        })
    }
}