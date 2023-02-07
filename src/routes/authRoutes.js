const controllers = require('../controllers/authControllers')

const express = require('express')

const router = express.Router()

router.post('/user', controllers.createUser)

router.post('/login', controllers.login)

router.post('/validate', controllers.validateToken)

module.exports = router
