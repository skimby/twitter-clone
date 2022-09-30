import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'
import { getLoggedUserFollowingBackend } from '../../store/follow'

import FollowButton from '../FollowButtons/FollowButton';
import FollowingButton from '../FollowButtons/FollowingButton';


function EachFollower({ follow, isOwnPage }) {
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
        if (loggedUserFollowing) {
            let isFollowing;

            isFollowing = loggedUserFollowing.find(usersFollow => follow?.userId === usersFollow?.followerId);

            if (isFollowing) {
                setAlreadyFollowing(true)
            } else {
                setAlreadyFollowing(false)
            }
        }

    }, [follows, follows?.loggedUserFollowing])


    return (
        <>
            <div className='tweet-profile-img' onClick={() => {
                history.push(`/${follow?.Follower?.username}/${follow?.userId}`)
            }}>
                <img className='profile-img' src={follow?.Follower?.profileImage} />
            </div>
            <div>

                <h5>{follow?.Follower?.firstName}  </h5>
                <h5>@{follow?.Follower?.username}</h5>
                <p>{follow?.Follower?.bio}</p>


                {alreadyFollowing && (
                    <FollowingButton loggedUserId={loggedUser?.id} userId={follow?.Follower.id} isOwnPage={isOwnPage} />
                )}

                {!alreadyFollowing && (
                    <FollowButton loggedUserId={loggedUser?.id} userId={follow?.userId} isOwnPage={isOwnPage} />
                )}
            </div>
        </>
    )
}
export default EachFollower;
