import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { editCommentBackend } from '../../../../store/comment'

function EditComment({ commentId, comment }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const tweetId = comment?.tweetId

    const [editComment, setEditComment] = useState(comment?.comment);



    const commentInput = { comment: editComment }

    const handleSubmit = async (e) => {
        // e.preventDefault();
        if (comment?.tweetId) {
            await dispatch(editCommentBackend(commentId, commentInput, tweetId))
        }
        history.push(`/tweets/${tweetId}`)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Edit Comment
                <input
                    type="text"
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Comment</button>
        </form>
    )
}

export default EditComment;
