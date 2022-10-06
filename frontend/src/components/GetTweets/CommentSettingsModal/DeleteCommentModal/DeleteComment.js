import { useState } from "react";
import { useDispatch } from 'react-redux';
import { deleteCommentBackend } from "../../../../store/comment";
import { useHistory } from 'react-router-dom';


function DeleteComment({ commentId, tweetId, setShowModal }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleDelete = async () => {
        await dispatch(deleteCommentBackend(commentId, tweetId))

        setShowModal(false)
    }

    return (
        <>
            <div className="settings-box">
                <h2>Delete Comment?</h2>
                <p>This can’t be undone and it will be removed from your profile, the timeline of any accounts that follow you, and from Twitter search results. </p>
                <button className="red-btn" onClick={handleDelete}>Delete</button>
                <button onClick={() => setShowModal(false)} className="outline-btn">Cancel</button>
            </div>
        </>
    )
}

export default DeleteComment;
