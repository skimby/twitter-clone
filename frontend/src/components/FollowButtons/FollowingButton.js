import { useDispatch } from "react-redux"
import { deleteFollowBackend } from '../../store/follow'
import { getFeedTweetsBackend } from '../../store/tweet'

function FollowingButton({ loggedUserId, userId, isOwnPage }) {
    const dispatch = useDispatch();

    const handleUnfollow = async () => {
        await dispatch(deleteFollowBackend(parseInt(loggedUserId), parseInt(userId), isOwnPage));
        // await dispatch(getFeedTweetsBackend())
    }
    return (
        <button onClick={handleUnfollow}>Following</button>
    )
}
export default FollowingButton;
