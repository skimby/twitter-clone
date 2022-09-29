import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'
import { getLoggedUserFollowingBackend } from '../../store/follow'
import FollowButton from '../FollowButtons/FollowButton';
import FollowingButton from '../FollowButtons/FollowingButton';

function EachFollow({ follow, isOwnPage }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const loggedUser = useSelector(state => state.session.user)
    const [alreadyFollowing, setAlreadyFollowing] = useState();

    const follows = useSelector(state => state.follows);
    const loggedUserFollowing = Object.values(follows?.loggedUserFollowing);

    useEffect(() => {
        dispatch(getLoggedUserFollowingBackend())
    }, [dispatch])

    useEffect(() => {
        let isFollowing;

        isFollowing = loggedUserFollowing.find(usersFollow => follow?.followerId === usersFollow?.followerId);

        if (isFollowing) {
            setAlreadyFollowing(true)
        } else {
            setAlreadyFollowing(false)
        }
    }, [follows, follows?.loggedUserFollowing])


    return (
        <>
            <div className='tweet-profile-img' onClick={() => {
                history.push(`/${follow?.Following?.username}/${follow?.followerId}`)
            }}>

                <img className='profile-img' src={follow?.Following?.profileImage} />

            </div>
            <div>

                <h5>{follow?.Following?.firstName}  </h5>
                <h5>@{follow?.Following?.username}</h5>
                <p>{follow?.Following?.bio}</p>


                {alreadyFollowing && (
                    <FollowingButton loggedUserId={loggedUser?.id} userId={follow?.followerId} isOwnPage={isOwnPage} />
                )}

                {!alreadyFollowing && (
                    <FollowButton loggedUserId={loggedUser?.id} userId={follow?.followerId} isOwnPage={isOwnPage} />
                )}
            </div>
        </>
    )
}
export default EachFollow;
