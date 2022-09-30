import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'
import { getLoggedUserFollowingBackend } from '../../store/follow'

import FollowButton from '../FollowButtons/FollowButton';
import FollowingButton from '../FollowButtons/FollowingButton';




function EachRecommendedFollow({ follow }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const loggedUser = useSelector(state => state.session.user)
    const [alreadyFollowing, setAlreadyFollowing] = useState();

    const follows = useSelector(state => state.follows);
    const loggedUserFollowing = Object.values(follows?.loggedUserFollowing);


    console.log(follow)
    useEffect(() => {
        dispatch(getLoggedUserFollowingBackend())
    }, [dispatch])
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
                    <FollowingButton loggedUserId={loggedUser?.id} userId={follow?.Follower.id} />
                )}

                {!alreadyFollowing && (
                    <FollowButton loggedUserId={loggedUser?.id} userId={follow?.userId} />
                )}
            </div>
        </>
    )
}

export default EachRecommendedFollow;
