const express = require('express')
const { addPost, getPost, getDelete } = require('../controllers/postController')
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router()

router.post('/',addPost)
router.get('/', authMiddleware, getPost)
router.delete('/',getDelete)

module.exports = router