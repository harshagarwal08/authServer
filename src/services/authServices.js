const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../../database/models')

const createUser = async(username, password) => {
    const user = await User.findOne({ where: { username } })
    if (user) {
        throw new Error('Username already exists')
    }
    const encryptedPassword = await bcrypt.hash(password, 10)

    await User.create({
        username,
        password: encryptedPassword
    })
}

const login = async(username, password) => {
    const user = User.findOne(
        { where: { username } },
    )
    if (!user) {
        throw new Error('User does not exist')
    }

    if(await bcrypt.compare(password, user.password))
    {
        const token = jwt.sign({ id: user.username }, process.env.KEY)
        return token
    }
    throw new Error('Invalid password')
}

module.exports = { createUser, login }