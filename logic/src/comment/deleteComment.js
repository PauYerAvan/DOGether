const { validators: { validateId } } = require('commons')
const { models: { User, Location, Comment } } = require('data')

function deleteComment(userId, commentId) {
    validateId(userId, 'user id')
    validateId(commentId, 'comment id')

    return User.findById(userId)
        .then(user => {
            if(!user) throw new Error(`user with id ${userId} not found`)

            return Comment.findById(commentId)
        })
        .then(comment => {
            if (!comment) throw new Error(`comment with id ${commentId} not found`)
            
            if (comment.user.toString() !== userId) throw new Error(`comment with id ${commentId} does not correspond to user with id ${userId}`)
            
            return comment.deleteOne({ _id: commentId })
        })
        .then(result => {
            if (result.deletedCount === 0) throw new Error(`could not delete comment with id ${commentId}`)
        })
    
}

module.exports = deleteComment






/*
const { validators: { validateId } } = require('commons')
const { models: { User, Comment } } = require('data')

function deleteComment(userId, commentId) {
    validateId(commentId, 'comment id')
    validateId(userId, 'user id')

    return Comment.deleteOne({ _id: commentId, user: userId })
        .then(result => {
            if (result.deletedCount === 0) throw new Error (`comment with id ${commentId} and user id ${userId} does not exist`)
        })
}

module.exports = deleteComment
*/