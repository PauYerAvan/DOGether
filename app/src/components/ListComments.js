import './ListComments.sass'
import { useState, useEffect } from 'react'
import { listLocationComments } from '../logic'
import { CommentCard, AddComment } from '.'
import { useParams } from 'react-router-dom'

export function ListComments() {
    const { locationId } = useParams()

    const [comments, setComments] = useState([])


    useEffect(async () => {
        try {
            const comments = await listLocationComments(sessionStorage.token, locationId)
            setComments(comments.reverse())

        } catch (error) {
            alert(error.message)
        }
    }, [])

    const updateListComment = async () => {
        try {
            const comments = await listLocationComments(sessionStorage.token, locationId)
            setComments(comments.reverse())

        } catch (error) {
            alert(error.message)
        }
    }

    return <>
        <div className="comments">
            <p className="comments__opening" >Añadir nuevo comentario:</p>
            <AddComment onCreatedComment={updateListComment} />
            {!!comments.length && <ul className="comments__list">
                {comments.map(comment =>
                    <li key={comment.id}>
                        <CommentCard comment={comment} onDeletedComment={updateListComment} />
                    </li>)}
            </ul>}
        </div>
    </>
}