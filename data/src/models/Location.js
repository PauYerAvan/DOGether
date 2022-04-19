const { model } = require('mongoose')
const { location } = require('../Schemas')

const Location = model('Location', location)

module.exports = Location