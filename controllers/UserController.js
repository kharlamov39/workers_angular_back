import bcript from 'bcrypt';
import UserModel from './../models/User.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const isUser = await UserModel.findOne({email: req.body.email})
        if(isUser) {
            return res.status(404).json({
                message: 'Email is not free'
            })
        }

        const password = req.body.password;
        const salt = await bcript.genSalt(10);
        const hash = await bcript.hash(password, salt)

        const doc = new UserModel({
            fullName: req.body.fullName,
            email: req.body.email,
            passwordHash: hash,
            company: req.body.company
        })

        const user = await doc.save();

        const token = jwt.sign(
            {_id: user._id},
            'secret123',
            { expiresIn: '30d' }
        )

        const { passwordHash, ...userData  } = user._doc;

        res.json({
            ...userData,
            token
        })

    } catch(err) {
        console.log(err)
        res.status(500).json({
            message: 'Error register'
        })
    }
}

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email})
        if(!user) {
            return res.status(404).json({
                message: 'Invalid email or password'
            })
        }

        const isValidPassword = await bcript.compare(req.body.password, user._doc.passwordHash)

        if(!isValidPassword) {
            return res.status(404).json({
                message: 'Invalid email or password'
            })
        }

        const token = jwt.sign({_id: user._id}, 'secret123', {expiresIn: '30d'})

        const { passwordHash, ...userData} = user._doc;

        res.json({
            ...userData,
            token
        })
    } catch(err) {
        console.log(err)
        res.status(500).json({
            message: 'Error login'
        })
    }
}

export const authMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId, '-passwordHash')

        if(!user) {
            return res.json({
                message: 'User is not found'
            })
        }

        res.json(user)
    } catch(err) {
        console.log(err)
        res.status(500).json({
            message: 'Error auth me'
        })
    }
}