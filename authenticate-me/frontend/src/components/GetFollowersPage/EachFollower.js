import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import { getLoggedUserFollowingBackend } from '../../store/follow'

import FollowButton from '../FollowerButtons/FollowButton2';
import FollowingButton2 from '../FollowerButtons/FollowingButton2';

function EachFollower({ follow, userPage, isOwnPage }) {
    const dispatch = useDispatch();
    const loggedUser = useSelector(state => state.session.user)
    const [alreadyFollowing, setAlreadyFollowing] = useState();

    const follows = useSelector(state => state.follows);
    const loggedUserFollowing = Object.values(follows?.loggedUserFollowing);

    // console.log(follow?.userId, loggedUserFollowing[2]?.followerId)

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
            <div className='tweet-profile-img'>
                <Link to={{
                    pathname: `/${userPage?.username}`,
                    state: {
                        userPageId: userPage?.id
                    }
                }}>

                    <img className='profile-img' src={follow?.Follower?.profileImage} />
                </Link>
            </div>
            <div>

                <h5>{follow?.Follower?.firstName}  </h5>
                <h5>@{follow?.Follower?.username}</h5>
                <p>{follow?.Follower?.bio}</p>


                {alreadyFollowing && (
                    <FollowingButton2 userId={loggedUser?.id} userPageId={follow?.Follower.id} isOwnPage={isOwnPage} />
                )}

                {!alreadyFollowing && (
                    <FollowButton userId={loggedUser?.id} userPageId={follow?.userId} isOwnPage={isOwnPage} />
                )}
            </div>
        </>
    )
}
export default EachFollower;
