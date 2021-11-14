import { UserModel } from "../models/User.js";

export const getAllUser = async (req, res) => {
    try {
        const users = await UserModel.find({})
            .select(['-password'])

        res.status(200).json({
            users
        })
    } catch (err) {
        res.status(500).json({ err: err })
    }
}

export const getUserWithPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const data = await UserModel.findById(userId)
            .select(['-password'])
            .populate('posts')

        res.status(200).json({
            data
        })
        // const posts = await PostModal.findOne({})
    } catch (err) {
        res.status(500).json({ err: err })
    }
}

export const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await UserModal.findByIdAndUpdate(userId, { ...req.body });

    } catch (err) {

    }
}