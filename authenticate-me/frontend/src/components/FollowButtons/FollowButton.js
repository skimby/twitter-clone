import { useDispatch } from "react-redux"
import { createFollowBackend } from '../../store/follow';

function FollowButton({ userId, loggedUserId, isOwnPage }) {
    const dispatch = useDispatch();

    const handleFollow = async () => {
        await dispatch(createFollowBackend(parseInt(loggedUserId), parseInt(userId), isOwnPage))
    }

    return (
        <button onClick={handleFollow}>Follow</button>
    )
}
export default FollowButton;
