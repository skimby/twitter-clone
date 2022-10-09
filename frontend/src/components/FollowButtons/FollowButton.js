import { useDispatch } from "react-redux"
import { createFollowBackend } from '../../store/follow';
import './FollowButtons.css'

function FollowButton({ userId, loggedUserId, isOwnPage }) {
    const dispatch = useDispatch();

    const handleFollow = async () => {
        await dispatch(createFollowBackend(parseInt(loggedUserId), parseInt(userId), isOwnPage))
    }

    return (
        <button className='follow-btn' onClick={handleFollow}>Follow</button>
    )
}
export default FollowButton;
