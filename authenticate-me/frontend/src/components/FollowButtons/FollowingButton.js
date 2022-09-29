import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { deleteFollowBackend } from '../../store/follow'

function FollowingButton({ loggedUserId, userId, isOwnPage }) {
    const dispatch = useDispatch();


    const handleUnfollow = async () => {
        await dispatch(deleteFollowBackend(parseInt(loggedUserId), parseInt(userId), isOwnPage));
    }
    return (
        <button onClick={handleUnfollow}>Following</button>
    )
}
export default FollowingButton;
