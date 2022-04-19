const { model } = require('mongoose')
const { comment } = require('../Schemas')

const Comment = model('Comment',  comment)

module.exports = Comment