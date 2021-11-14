import { UserModel } from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const register = async (req, res, next) => {
    try {
        const user = await UserModel.create(req.body);

        const token = jwt.sign(
            { userId: user._id },
            process.env.APP_SECRET);
        res.status(200).json({
            status: 'success',
            data: {
                token,
                userName: user.name,
                userId: user._id,
            }

        })
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            const err = new Error("Email is not exist");
            err.statusCode = 400;
            return next(err);
        }

        if (bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET);
            res.json({
                status: 'success',
                data: {
                    token,
                    userName: user.name,
                    userId: user._id,
                    photoId: user.photoId,
                }
            })
        } else {
            const err = new Error("Password is not correct");
            err.statusCode = 400;
            return next(err);
        }

    } catch (error) {
        next(error);
    }
}

export const getCurrentUser = async (req, res, next) => {
    try {
        const data = { user: null };
        if (req.user) {
            const user = await UserModel.findOne({ _id: req.user.userId });
            data.user = {
                userName: user.name,
                userId: user._id,
                photoId: user.photoId,
            }
        }
        res.status(200).json({
            status: 'success',
            data: data
        });
    } catch (error) {
        res.json(error)
    }
}