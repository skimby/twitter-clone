import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import { getLoggedUserFollowingBackend } from '../../store/follow'
import FollowButton from '../FollowButtons/FollowButton';
import FollowingButton from '../FollowButtons/FollowingButton';

function EachFollow({ follow, userPage, isOwnPage }) {
    const dispatch = useDispatch();
    const loggedUser = useSelector(state => state.session.user)
    const [alreadyFollowing, setAlreadyFollowing] = useState();

    // const [isOwnPage, setIsOwnPage] = useState();
    const follows = useSelector(state => state.follows);
    const loggedUserFollowing = Object.values(follows?.loggedUserFollowing);


    useEffect(() => {
        dispatch(getLoggedUserFollowingBackend())
    }, [dispatch])

    useEffect(() => {
        let isFollowing;
        if (isOwnPage) {
            isFollowing = loggedUserFollowing.find(usersFollow => follow?.followerId === usersFollow?.followerId);

            if (isFollowing) {
                setAlreadyFollowing(true)
            } else {
                setAlreadyFollowing(false)
            }
        } else {
            isFollowing = loggedUserFollowing.find(usersFollow => follow?.followerId === usersFollow?.followerId);

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

                    <img className='profile-img' src={follow?.Following?.profileImage} />

                </Link>
            </div>
            <div>

                <h5>{follow?.Following?.firstName}  </h5>
                <h5>@{follow?.Following?.username}</h5>
                <p>{follow?.Following?.bio}</p>


                {alreadyFollowing && (
                    <FollowingButton userId={loggedUser?.id} userPageId={follow?.followerId} isOwnPage={isOwnPage} />
                )}

                {!alreadyFollowing && (
                    <FollowButton userId={loggedUser?.id} userPageId={follow?.followerId} isOwnPage={isOwnPage} />
                )}
            </div>
        </>
    )
}
export default EachFollow;
