import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from 'react-router-dom';
import { createFollowBackend } from '../../store/follow';

function FollowButton({ userId, userPageId, userPage }) {
    const dispatch = useDispatch();
    const history = useHistory()
    console.log(userPage)
    const handleFollow = async () => {
        await dispatch(createFollowBackend(userId, userPageId))
        // history.push(`/${userPage.username}`);
    }

    return (
        <button onClick={handleFollow}>Follow</button>
    )
}
export default FollowButton;
