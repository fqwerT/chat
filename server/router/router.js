
const Router = require('express').Router
const createUser = require('../models/user-model.js').createUser
const loginUser = require('../models/login-user.js').loginUser

const router = new Router()

router.post('/registration', createUser)
router.post('/login',loginUser)
router.post('/logout')
router.get('/logout')
router.get('/refresh')


module.exports = router
