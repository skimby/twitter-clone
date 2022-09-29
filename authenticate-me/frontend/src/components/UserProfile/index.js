import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory, Link, useParams } from 'react-router-dom';
import { getUserBackend } from '../../store/user'
import { getTweetsUserBackend, getTweetsLoggedUserBackend } from '../../store/tweet'
import FollowingButton from '../FollowButtons/FollowingButton';
import FollowButton from '../FollowButtons/FollowButton';
import { getFollowingBackend, getLoggedUserFollowingBackend } from '../../store/follow';
import GetTweets from '../GetTweets';
import './UserProfile.css'


function UserProfile({ sessionUser }) {
    const dispatch = useDispatch();
    const history = useHistory();
    let { userId } = useParams();
    userId = parseInt(userId);



    const [isOwnPage, setIsOwnPage] = useState();
    const [alreadyFollowing, setAlreadyFollowing] = useState();
    const tweets = useSelector(state => state.tweets)
    // const loggedUser = useSelector(state => state.session.user)
    const user = useSelector(state => state.users.User);
    const follows = useSelector(state => state.follows)
    const loggedUserFollowingTest = Object.values(useSelector(state => state.follows.loggedUserFollowing));
    const following = Object.values(follows?.following)
    let joinedDate = user?.createdAt


    useEffect(() => {
        dispatch(getUserBackend(userId))
    }, [dispatch, userId, follows])

    useEffect(() => {
        if (userId === sessionUser?.id) {
            setIsOwnPage(true)
            dispatch(getTweetsLoggedUserBackend(parseInt(userId)))
        } else {
            setIsOwnPage(false)
            dispatch(getTweetsUserBackend(parseInt(userId)))
        }
    }, [dispatch, userId])

    useEffect(() => {
        dispatch(getLoggedUserFollowingBackend())
        dispatch(getFollowingBackend(userId, isOwnPage))
    }, [dispatch, userId])

    useEffect(() => {
        let isTrue = 0;
        for (let i = 0; i < loggedUserFollowingTest.length; i++) {
            if (userId === loggedUserFollowingTest[i].followerId) {
                isTrue = true
            }
        }

        if (isTrue) {
            setAlreadyFollowing(true)
        } else {
            setAlreadyFollowing(false)
        }
    }, [loggedUserFollowingTest])

    const handleBack = () => {
        history.push('/')
    }

    return (
        <>
            <div id="middle-container">

                <div>
                    <div>
                        <i className="fa-solid fa-arrow-left-long" onClick={handleBack}></i>
                    </div>
                    <div>
                        <h5>@{user?.username}</h5>
                        <p>{user?.tweetCount} Tweets</p>
                    </div>

                </div>

                <div className='cover-image-container'>
                    <img className='cover-img' src={user?.coverImage} />
                </div>

                <div>
                    <img className='user-profile-img-big' src={user?.profileImage} />

                    {alreadyFollowing && (
                        <FollowingButton loggedUserId={sessionUser?.id} userId={userId} />
                    )}
                    {!alreadyFollowing && (
                        <FollowButton loggedUserId={sessionUser?.id} userId={userId} />
                    )}
                </div>

                <div>
                    <h3>{user?.firstName}</h3>
                    <p>@{user?.username}</p>
                    <p>{user?.bio}</p>
                    <i className="fa-solid fa-link"></i>
                    <p>{user?.website}</p>
                    <i className="fa-regular fa-calendar-days"></i>


                    {joinedDate && (
                        <p>Joined {joinedDate[1]} {joinedDate[3]}</p>
                    )}

                    {user && (
                        <>

                            <p onClick={() => {
                                history.push(`/${user?.username}/${userId}/follows`)
                            }}>{user?.followingCount} Following</p>



                            <p onClick={() => {
                                history.push(`/${user?.username}/${userId}/followers`)
                            }}>
                                {user?.followerCount} Followers
                            </p>

                        </>
                    )}

                </div>

                <div>
                    {isOwnPage && (
                        <GetTweets tweets={Object.values(tweets?.loggedUserTweets)} />
                    )}
                    {!isOwnPage && (
                        <GetTweets tweets={Object.values(tweets?.userTweets)} />

                    )}
                </div>
            </div>
        </>
    )
}

export default UserProfile;
