const express = require( "express")
const { Follow, UnFollow, Followers, getSingleUser,getUsers, updateUser, Following, publicPrivate } = require( "../controllers/users.js")

const router = express.Router()

router.post('/follow/:id',Follow)
router.get('/follower/:id',Followers)
router.get('/following/:id',Following)
router.post('/unfollow/:id',UnFollow)
router.get('/',getUsers)
router.get('/:id',getSingleUser)
router.put('/update/:id',updateUser)
router.put('/profile/:id',publicPrivate)

//export default router
module.exports = router