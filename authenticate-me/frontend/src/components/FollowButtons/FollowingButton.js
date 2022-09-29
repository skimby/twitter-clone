import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { deleteFollowBackend } from '../../store/follow'

function FollowingButton({ userId, userPageId, isOwnPage }) {
    const dispatch = useDispatch();


    const handleUnfollow = async () => {
        await dispatch(deleteFollowBackend(parseInt(userId), parseInt(userPageId), isOwnPage));
    }
    return (
        <button onClick={handleUnfollow}>Following</button>
    )
}
export default FollowingButton;
