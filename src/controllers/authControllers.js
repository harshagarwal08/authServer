const services = require('../services/authServices')
const jwt = require('jsonwebtoken')

const createUser = async(req, res) => {
    try{
        const { username , password } = req.body

        await services.createUser(username, password)
    
        res.status(201).json('User created successfully')
    }
    catch(err){
        res.status(500).json({err: err.message})
    }
}

const login = async(req, res) => {
    try{
        const { username, password } = req.body

        const token = await services.login(username, password)

        res.status(200).json(token)
    }
    catch(err){
        res.status(500).json({err: err.message})
    }
}

const validateToken = async(req, res, next) => {
    const token = req.headers.authorization

    if(!token) return res.status(403).json('A token is required for authentication')

    try{
        const decoded = jwt.verify(token, process.env.KEY)
        req.user = decoded
    }
    catch(err){
        res.status(401).json('Invalid Token')
    }
    return next()
} 

module.exports = { createUser, login, validateToken }
