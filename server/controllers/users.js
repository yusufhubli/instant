const mongoose = require("mongoose")
const Users = require("../models/Users.js")
const cloudinary = require("cloudinary").v2


const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const file = req.files.file
    console.log(file)
    const { FirstName, LastName, Age, DOB, State, City, Bio } = req.body
    const data = await Users.findOne({ _id: id }, { PublicId: 1 })
    console.log(data)
    if (data.PublicId == "") {
      const image = await cloudinary.uploader.upload(file.tempFilePath,
        { folder: "users" },
        function (error, result) {
          console.log(error)
          return result.url
        });
      console.log(image)
      const upuser = await Users.updateOne({ _id: id }, { FirstName, LastName, Age, DOB, Bio, City, State, PublicId: image.public_id, Avatar: image.url })
      console.log('first',upuser)
      fs.rmSync(path.relative('/', '/tmp'), { recursive: true, force: true })
      if (upuser) {
        res.status(200).json({ msg: "user updated" })
      }
    } else {
      const del = await cloudinary.uploader.destroy(data.PublicId)
      console.log(del)
      if (del.result == "ok") {
        const image = await cloudinary.uploader.upload(file.tempFilePath,
          { folder: "users" },
          function (error, result) {
            console.log(error)
            return result.url
          });

        const uppost = await Users.updateOne({ _id: id }, { FirstName, LastName, Age, DOB, Bio, City, State, PublicId: image.public_id, Avatar: image.url })
      console.log('second',uppost)
        fs.rmSync(path.relative('/', '/tmp'), { recursive: true, force: true })
        if (uppost) {
          res.status(200).json({ msg: "updated successfully" })
        }
      }
    }
    } catch (error) {
      res.status(400).json(error)
    }
  }

 const getSingleUser = async (req, res) => {
    try {
      const { id } = req.params
      const user = await Users.aggregate([{ $match: { _id: new mongoose.Types.ObjectId(id) } }, { $project: { FirstName: 1, LastName: 1, UserName: 1, DOB: 1, Profile: 1, Email: 1, Age: 1,Avatar:1, Bio: 1, City: 1, State: 1, Followers: { $size: "$Followers" }, Following: { $size: "$Following" } } }])
      //  console.log(user)
      res.status(200).json(user[0])
    } catch (error) {
      res.status(400).json(error)
    }
  }

  const getUsers = async (req, res) => {
    try {
      const user = await Users.find({}, { FirstName: 1, LastName: 1, UserName: 1 ,Avatar:1 })
      res.status(200).json(user)
    } catch (error) {
      res.status(400).json(error)
    }
  }

  const Follow = async (req, res) => {
    try {
      const { id } = req.params
      const { UserId } = req.body

      const following = await Users.findByIdAndUpdate({ _id: id }, { $push: { Followers: { UserId: UserId } } })
      const follower = await Users.findByIdAndUpdate({ _id: UserId }, { $push: { Following: { UserId: id } } })
      res.status(200).json({ msg: "followed", follower, following })
    } catch (error) {
      res.status(400).json(error)
    }
  }

  const UnFollow = async (req, res) => {
    try {
      const { id } = req.params
      const { UserId } = req.body
      const following = await Users.findByIdAndUpdate({ _id: id }, { $pull: { Followers: { UserId: UserId } } })
      const follower = await Users.findByIdAndUpdate({ _id: UserId }, { $pull: { Following: { UserId: id } } })
      res.status(200).json({ msg: "followed", follower, following })
    } catch (error) {
      res.status(400).json(error)
    }
  }

  const Followers = async (req, res) => {
    try {
      const { id } = req.params
      const followers = await Users.find({ _id: id }, { Followers: 1, _id: 0 }).populate({ path: 'Followers.UserId', select: ['FirstName', 'LastName', 'UserName','Avatar'] })
      res.status(200).json(followers[0].Followers)
    } catch (error) {
      res.status(400).json(error)
    }
  }

  const Following = async (req, res) => {
    try {
      const { id } = req.params
      const following = await Users.find({ _id: id }, { Following: 1, _id: 0 }).populate({ path: 'Following.UserId', select: ['FirstName', 'LastName', 'UserName','Avatar'] })
      res.status(200).json(following[0].Following)
    } catch (error) {
      res.status(400).json(error)
    }
  }

  const publicPrivate = async (req, res) => {
    try {
      const { id } = req.params
      const { Profile } = await Users.findOne({ _id: id }, { Profile: 1, _id: 0 })
      if (Profile === true) {
        const ty = await Users.updateOne({ _id: id }, { Profile: false })
        res.status(200).json({ profile: false })
      } else {
        const ty = await Users.updateOne({ _id: id }, { Profile: true })
        res.status(200).json({ profile: true })
      }
    } catch (error) {
      res.status(400).json(error)
    }
  }

  module.exports = { Follow, UnFollow, Followers, getSingleUser, getUsers, updateUser, Following, publicPrivate }