import './DeleteCommentButton.sass'
import { deleteComment } from '../../../logic'
import { DeleteIcon } from '../../icons'
import { Button } from '.'


export function DeleteCommentButton({commentId, onDeletedComment}) {

    const handleDeleteComment = async event => {
        event.preventDefault()
        
        try{
            await deleteComment(sessionStorage.token, commentId)
                alert("Comentario eliminado")
                onDeletedComment()
        } catch (error) {
            alert(error.message)
        }
    }

  

    return <>
            <Button onClick={handleDeleteComment}><DeleteIcon className="delete-icon"/></Button>
    </>
}



