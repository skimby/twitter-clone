import { useDispatch } from "react-redux"
import { deleteFollowBackend } from '../../store/follow'

function FollowingButton({ loggedUserId, userId, isOwnPage }) {
    const dispatch = useDispatch();

    const handleUnfollow = async () => {
        await dispatch(deleteFollowBackend(parseInt(loggedUserId), parseInt(userId), isOwnPage));
    }
    return (
        <button className='following-btn outline-btn' onClick={handleUnfollow}>Following</button>
    )
}
export default FollowingButton;
