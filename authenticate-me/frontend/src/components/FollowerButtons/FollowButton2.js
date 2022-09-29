import { useDispatch } from "react-redux"
import { createFollowBackend } from '../../store/follow';

function FollowButton({ userId, userPageId, isOwnPage }) {
    const dispatch = useDispatch();

    const handleFollow = async () => {
        await dispatch(createFollowBackend(parseInt(userId), parseInt(userPageId), isOwnPage))
    }

    return (
        <button onClick={handleFollow}>Follow</button>
    )
}
export default FollowButton;
