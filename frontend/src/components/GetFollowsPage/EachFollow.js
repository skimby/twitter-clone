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
    }, [follows, loggedUserFollowing, follow?.followerId,])


    return (
        <>
            <div className='tweet-container-follow' >
                <div className='tweet-profile-img' onClick={() => { history.push(`/${follow?.Following?.username}/${follow?.Following?.id}`) }}>

                    <img className='profile-img' src={follow?.Following?.profileImage} alt='user profile' />
                </div>

                <div className='tweet-text-box'>

                    <div className='tweet-user-header-follow'>
                        <div className='username-name-box'>
                            <h5 className='name-username' onClick={() => { history.push(`/${follow?.Following?.username}/${follow?.Following?.id}`) }}>
                                {follow?.Following?.firstName}</h5>
                            {follow?.Following?.verified && (
                                <div className="verified-div2">
                                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/640px-Twitter_Verified_Badge.svg.png' className='verified-badge' alt='verified badge icon' />
                                </div>
                            )}
                            <div>
                                <h5><span className='thin-styling-small'> @{follow?.Following?.username} </span></h5>
                            </div>

                        </div>
                        <div>
                            {alreadyFollowing && (
                                <FollowingButton loggedUserId={loggedUser?.id} userId={follow?.followerId} isOwnPage={isOwnPage} />
                            )}

                            {!alreadyFollowing && (
                                <FollowButton loggedUserId={loggedUser?.id} userId={follow?.followerId} isOwnPage={isOwnPage} />
                            )}
                        </div>

                        <div className='bio-styling'>
                            <p>{follow?.Following?.bio}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default EachFollow;
