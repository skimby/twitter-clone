import { useState } from "react";
import { useDispatch } from 'react-redux';
import { deleteTweetBackend } from '../../../store/tweet';

function DeleteTweetForm({ tweetId }) {
    const dispatch = useDispatch();

    const handleDelete = async () => {
        await dispatch(deleteTweetBackend(tweetId))
    }

    return (
        <>
            <h2>Delete Tweet?</h2>
            <p>This can’t be undone and it will be removed from your profile, the timeline of any accounts that follow you, and from Twitter search results. </p>
            <button onClick={handleDelete}>Delete</button>
            <button>Cancel</button>
        </>
    )
}

export default DeleteTweetForm;
