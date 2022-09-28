import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { deleteFollowBackend } from '../../store/follow'

function FollowingButton({ userId, userPageId }) {
    const dispatch = useDispatch();

    console.log(userId, userPageId)
    const handleUnfollow = async () => {
        await dispatch(deleteFollowBackend(parseInt(userId), parseInt(userPageId)));
    }
    return (
        <button onClick={handleUnfollow}>Following</button>
    )
}
export default FollowingButton;
