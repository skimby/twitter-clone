import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { editCommentBackend } from "../../../../store/comment";


function EditComment({ commentId, comment }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [editComment, setEditComment] = useState(comment?.comment);



    const handleSubmit = async () => {
        const commentInput = { comment: editComment }
        const tweetId = comment?.tweetId
        await dispatch(editCommentBackend(commentId, tweetId, commentInput))
        // history.push(`/tweets/${tweetId}`)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Edit Tweet
                <input
                    type="text"
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Tweet</button>
        </form>
    )
}

export default EditComment;
