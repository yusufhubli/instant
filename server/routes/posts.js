const express = require("express")
const { addComment,getComment, addPost, deleteComment, deletePost, getPosts, getUserPosts,Like,Dislike, updateComment, updatePost } = require("../controllers/posts.js")

const router = express.Router()

router.post('/comment/:id',addComment)
router.get('/comment/:id',getComment)
router.put('/comment/:id',updateComment)
router.delete('/comment/:id',deleteComment)
router.post('/likes/:id',Like)
router.post('/dislikes/:id',Dislike)
router.post('/',addPost)
router.get('/',getPosts)
router.get('/:id',getUserPosts)
router.put('/:id',updatePost)
router.delete('/:id',deletePost)

module.exports= router
