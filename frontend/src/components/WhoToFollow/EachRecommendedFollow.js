import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'
import { getLoggedUserFollowingBackend } from '../../store/follow'

import FollowButton from '../FollowButtons/FollowButton';
import FollowingButton from '../FollowButtons/FollowingButton';
import './WhoToFollow.css'


function EachRecommendedFollow({ follow, loggedUser }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [alreadyFollowing, setAlreadyFollowing] = useState();

    const follows = useSelector(state => state.follows);
    const loggedUserFollowing = Object.values(follows?.loggedUserFollowing);


    // console.log(follow)
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

    }, [follows, follows?.loggedUserFollowing, follows?.nonFollowers])


    return (
        <>
            <div className='each-follower-box'>
                <div className='follow-profile-img' onClick={() => {
                    history.push(`/${follow?.username}/${follow?.id}`)
                }}>
                    <img className='profile-img' src={follow?.profileImage} />
                </div>

                <div className='follower-info-box'>
                    <p className='small-p-bold'>{follow?.firstName}  </p>
                    <p className='small-p'>@{follow?.username}</p>
                </div>


                <div className='follow-btn-box'>
                    {alreadyFollowing && (
                        <FollowingButton loggedUserId={loggedUser?.id} userId={follow?.id} />
                    )}

                    {!alreadyFollowing && (
                        <FollowButton loggedUserId={loggedUser?.id} userId={follow?.id} />
                    )}
                </div>
            </div>
        </>
    )
}

export default EachRecommendedFollow;