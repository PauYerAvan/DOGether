const { model } = require('mongoose')
const { user } = require('../Schemas')

const User = model('User', user)

module.exports = User