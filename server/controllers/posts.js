const Posts = require("../models/Posts.js")
const Users = require("../models/Users.js")
const fs = require('fs')
const path = require("path")
const cloudinary = require('cloudinary').v2

 const getPosts = async (req, res) => {
    try {
        const posts = await Posts.find().populate("UserId")
        res.status(200).json(posts)
    } catch (error) {
        res.status(400).json(error)
    }
}

 const getUserPosts = async (req, res) => {
    try {
        const { id } = req.params
        const posts = await Posts.find({ UserId: id }).populate('UserId')
        //console.log(posts)
        res.status(200).json(posts)
    } catch (error) {
        res.status(400).json(error)
    }
}

 const updatePost = async (req, res) => {
    try {
        const { id } = req.params
        const file = req.files.file
        const { Description } = req.body
        const { PublicId } = await Posts.findOne({ _id: id }, { PublicId: 1, _id: 0 })
        console.log(PublicId)
        const del = await cloudinary.uploader.destroy(PublicId)
        console.log(del)
        if (del.result == "ok") {
            const image = await cloudinary.uploader.upload(file.tempFilePath,
                { folder: "posts" },
                function (error, result) {
                    console.log(error)
                    return result.url
                });

            const uppost = await Posts.updateOne({ _id: id }, { Image: image.url, PublicId: image.public_id, Description })
            if (uppost) {
                res.status(200).json({ message: "updated successfully" })
            }
        } else {
            res.status(200).json({ message: "not updated" })
        }
    } catch (error) {
        res.status(400).json(error)
    }
}

 const deletePost = async (req, res) => {
    try {
        const { id } = req.params
        const { PublicId } = await Posts.findOne({ _id: id }, { PublicId: 1, _id: 0 })
        console.log(PublicId)
        const del = await cloudinary.uploader.destroy(PublicId)
        console.log(del)
        if (del.result == "ok") {
            const delpost = await Posts.deleteOne({ _id: id })
            if (delpost) {
                res.status(200).json({ message: "deleted successfully" })
            }
        } else {
            res.status(200).json({ message: "not deleted" })
        }
    } catch (error) {
        res.status(400).json(error)
    }
}

 const addPost = async (req, res) => {
    try {
        const file = req.files.file
        const { UserId, Description } = req.body
        console.log(file)
        console.log(req.body)
        const image = await cloudinary.uploader.upload(file.tempFilePath,
            { folder: "posts" },
            function (error, result) {
                console.log(error)
                return result.url
            });
        console.log(image)
        const post = await Posts.create({ UserId, Image: image.url, PublicId: image.public_id, Description })
        console.log(post)
        fs.rmSync(path.relative('/', '/tmp'), { recursive: true, force: true })
        if (post) {
            res.status(200).json({ message: "successfully posted" })
        }
        //res.status(200).json({ message: "successfully posted",file })

    } catch (error) {
        res.status(400).json(error)
    }
}

 const Like = async (req, res) => {
    try {
        const { id } = req.params
        const { UserId } = req.body
        const likedUser = await Posts.findOne({ _id: id, 'Likes.UserId': UserId })
        console.log(likedUser, 'find')
        if (likedUser != null) {
            const unlike = await Posts.updateOne({ _id: id }, { $pull: { Likes: { UserId: UserId } } })
            console.log(unlike, 'hello')
            res.status(200).json({ message: "successfully removed", unlike })
        } else {
            const unlike = await Posts.updateOne({ _id: id }, { $pull: { DisLikes: { UserId: UserId } } })
            console.log('unlike', unlike)
            const like = await Posts.updateOne({ _id: id }, { $push: { Likes: { UserId: UserId } } })
            console.log(like, 'like')
            res.status(200).json({ message: "successfully liked", like })
        }
    } catch (error) {
        res.status(400).json(error)
    }
}
 const Dislike = async (req, res) => {
    try {
        const { id } = req.params
        const { UserId } = req.body
        const likedUser = await Posts.findOne({ _id: id, 'DisLikes.UserId': UserId })
        if (likedUser != null) {
            const unlike = await Posts.updateOne({ _id: id }, { $pull: { DisLikes: { UserId: UserId } } })
            console.log(unlike)
            res.status(200).json({ message: "successfully removed", unlike })
        } else {
            const unlike = await Posts.updateOne({ _id: id }, { $pull: { Likes: { UserId: UserId } } })
            const like = await Posts.updateOne({ _id: id }, { $push: { DisLikes: { UserId: UserId } } })
            console.log(like)
            res.status(200).json({ message: "successfully unliked", like })
        }
    } catch (error) {
        res.status(400).json(error)
    }
}

 const addComment = async (req, res) => {
    try {
        const { id } = req.params
        const { UserId, comment } = req.body
        const cmt = await Posts.updateOne({ _id: id }, { $push: { Comments: { UserId, comment } } })
        console.log(cmt)
        res.status(200).json({ message: "commented", cmt })
    } catch (error) {
        res.status(400).json(error)
    }
}

 const getComment = async (req, res) => {
    try {
        const { id } = req.params
        const posts = await Posts.find({ _id: id }).populate('Comments.UserId')
        res.status(200).json(posts)
    } catch (error) {
        res.status(400).json(error)
    }
}

 const updateComment = async (req, res) => {
    try {

    } catch (error) {
        res.status(400).json(error)
    }
}
 const deleteComment = async (req, res) => {
    try {

    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports =  { addComment,getComment, addPost, deleteComment, deletePost, getPosts, getUserPosts,Like,Dislike, updateComment, updatePost }