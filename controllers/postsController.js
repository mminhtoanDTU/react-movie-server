import { PostModel } from '../models/Posts.js';

export const getPosts = async (req, res, next) => {
    try {
        const posts = await PostModel.find({})
            .populate({ path: 'author', select: ['name', 'photoId'] })
            .sort({ createdAt: -1 })

        res.status(200).json({
            status: 'success',
            results: posts.length,
            data: { posts }
        })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const posts = await PostModel.find({ author: userId })
            .populate({ path: 'author', select: ['name', 'photoId'] })
            .sort({ createdAt: - 1 })

        res.status(200).json({
            status: 'success',
            results: posts.length,
            data: { posts }
        })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

// Create new post
export const createPost = async (req, res, next) => {
    try {
        const { userId } = req.user;
        let post = await PostModel.create({
            ...req.body, author: userId
        })

        post = await post.populate({ path: 'author', select: ['name', 'photoId'] })

        res.status(200).json({
            status: 'success',
            data: { post }
        })
    } catch (error) {
        next(error)
    }
}

// Update post
export const updatePost = async (req, res, next) => {
    try {
        const { postId } = req.params;

        const post = await PostModel.findByIdAndUpdate(
            postId,
            { ...req.body },
            {
                new: true,
                runValidators: true,
                populate: { path: 'author', select: ['name', 'photoId'] }
            }
        )

        res.status(200).json({
            status: 'success',
            data: { post }
        })
    } catch (error) {
        next(error);
    }
}

// Delete 1 post
export const deletePost = async (req, res, next) => {
    try {
        const { postId } = req.params;

        await PostModel.findByIdAndDelete(postId)

        res.status(200).json({
            status: 'success',
            message: 'Post has been deleted.'
        })
    } catch (error) {
        next(error);
    }
}