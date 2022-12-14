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

    }, [follows, follow?.userId, loggedUserFollowing])


    return (
        <>
            <div className='tweet-container-follow' >
                <div className='tweet-profile-img' onClick={() => { history.push(`/${follow?.Follower?.username}/${follow?.Follower?.id}`) }}>

                    <img className='profile-img pointer' src={follow?.Follower?.profileImage} alt='user profile' />
                </div>

                <div className='tweet-text-box'>

                    <div className='tweet-user-header-follow'>
                        <div className='username-name-box'>
                            <h5 className='name-username pointer' onClick={() => { history.push(`/${follow?.Follower?.username}/${follow?.Follower?.id}`) }}>
                                {follow?.Follower?.firstName}</h5>
                            {follow?.Follower?.verified && (
                                <div className="verified-div2">
                                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/640px-Twitter_Verified_Badge.svg.png' className='verified-badge' alt='verified badge icon' />
                                </div>
                            )}
                            <div>
                                <h5><span className='thin-styling-small'> @{follow?.Follower?.username} </span></h5>
                            </div>


                        </div>
                        <div>
                            {alreadyFollowing && (
                                <FollowingButton loggedUserId={loggedUser?.id} userId={follow?.Follower.id} isOwnPage={isOwnPage} />
                            )}

                            {!alreadyFollowing && (
                                <FollowButton loggedUserId={loggedUser?.id} userId={follow?.userId} isOwnPage={isOwnPage} />
                            )}
                        </div>

                        <div className='bio-styling'>
                            <p>{follow?.Follower?.bio}</p>
                        </div>
                    </div>
                </div>
            </div >

            {/* {alreadyFollowing && (
                    <FollowingButton loggedUserId={loggedUser?.id} userId={follow?.Follower.id} isOwnPage={isOwnPage} />
                )}

                {!alreadyFollowing && (
                    <FollowButton loggedUserId={loggedUser?.id} userId={follow?.userId} isOwnPage={isOwnPage} />
                )}
            </div> */}
        </>
    )
}
export default EachFollower;
