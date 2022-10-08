import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory, Link, useParams } from 'react-router-dom';
import { getUserBackend } from '../../store/user'
import { getTweetsUserBackend, getTweetsLoggedUserBackend } from '../../store/tweet'
import FollowingButton from '../FollowButtons/FollowingButton';
import FollowButton from '../FollowButtons/FollowButton';
import { getFollowingBackend, getLoggedUserFollowingBackend } from '../../store/follow';
import GetTweets from '../GetTweets';
import UserLikes from './UserLikes';

import './UserProfile.css'


function UserProfile({ sessionUser }) {
    const dispatch = useDispatch();
    const history = useHistory();
    let { userId } = useParams();
    userId = parseInt(userId);

    const blueLineStyling = {
        borderBottom: "4px solid rgb(29, 155, 240)",
        paddingTop: '10px'
    }
    const noStyling = {}
    const [activeFeatureTweets, setActiveFeatureTweets] = useState(blueLineStyling)
    const [activeFeatureRetweets, setActiveFeatureRetweets] = useState(noStyling)
    const [activeFeatureLikes, setActiveFeatureLikes] = useState(noStyling)

    const [isOwnPage, setIsOwnPage] = useState();
    const [alreadyFollowing, setAlreadyFollowing] = useState();
    const tweets = useSelector(state => state.tweets);

    // const loggedUser = useSelector(state => state.session.user)
    const user = useSelector(state => state.users.User);
    const follows = useSelector(state => state.follows)
    const loggedUserFollowingTest = Object.values(useSelector(state => state.follows.loggedUserFollowing));
    const following = Object.values(follows?.following)
    let joinedDate = user?.createdAt


    console.log(isOwnPage)

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

    const handleTweets = (e) => {
        e.preventDefault();
        if (Object.values(activeFeatureTweets).length) {
            setActiveFeatureTweets(noStyling)
        } else {
            setActiveFeatureTweets(blueLineStyling)
            setActiveFeatureLikes(noStyling)
            setActiveFeatureRetweets(noStyling)
        }
    }

    const handleRetweets = (e) => {
        e.preventDefault();
        if (Object.values(activeFeatureRetweets).length) {
            setActiveFeatureRetweets(noStyling)
        } else {
            setActiveFeatureRetweets(blueLineStyling)
            setActiveFeatureLikes(noStyling)
            setActiveFeatureTweets(noStyling)
        }
    }

    const handleLikes = (e) => {
        e.preventDefault();
        if (Object.values(activeFeatureLikes).length) {
            setActiveFeatureRetweets(noStyling)
        } else {
            setActiveFeatureLikes(blueLineStyling)
            setActiveFeatureRetweets(noStyling)
            setActiveFeatureTweets(noStyling)
        }
    }
    return (
        <>

            <div className='user-profile-header'>
                <div className='x-box'>
                    <i className="fa-solid fa-arrow-left-long" onClick={handleBack}></i>
                </div>
                <div className='user-information-box'>
                    <h5 className='user-bold-styling'>{user?.username}</h5>
                    <p className='p-gray-small'>{user?.tweetCount} Tweets</p>
                </div>

            </div>

            <div className='cover-image-container'>
                <img className='cover-img' src={user?.coverImage} />
            </div>

            <div className='user-profile-img-big-container'>
                <img className='user-profile-img-big' src={user?.profileImage} />
            </div>

            <div className='following-button-box'>
                {!isOwnPage && (
                    <>
                        {alreadyFollowing && (
                            <FollowingButton loggedUserId={sessionUser?.id} userId={userId} />
                        )}
                        {!alreadyFollowing && (
                            <FollowButton loggedUserId={sessionUser?.id} userId={userId} />
                        )}
                    </>
                )}
            </div>

            <div className='user-info-box-contents'>
                <h5 className='user-bold-styling'>{user?.firstName}</h5>
                <p className='p-gray-small'>@{user?.username}</p>
                <p className='no-margin'>{user?.bio}</p>

                <div className='website-calendar-box'>
                    {user?.website && (
                        <div className='website-box'>
                            <i className="fa-solid fa-link gray-icon"></i>
                            <p className='gray-p'>{user?.website}</p>
                        </div>
                    )}


                    <div className='calendar-box'>
                        <i className="fa-regular fa-calendar-days gray-icon"></i>

                        <p className='gray-p'>Joined {joinedDate?.[1]} {joinedDate?.[3]}</p>
                    </div>
                </div>


                {user && (
                    <>
                        <div className='followers-box'>
                            <p className='gray-p follower-styling' onClick={() => {
                                history.push(`/${user?.username}/${userId}/follows`)
                            }}><span className='bold'>{user?.followingCount}</span> Following</p>



                            <p className='gray-p follower-styling' onClick={() => {
                                history.push(`/${user?.username}/${userId}/followers`)
                            }}>
                                <span className='bold'>
                                    {user?.followerCount}</span> Followers
                            </p>
                        </div>
                    </>
                )}

            </div>



            <div className='features-container'>

                <div onClick={handleTweets}>
                    <h5 className='features'>Tweets</h5>
                    <div className='active-feature-div' style={activeFeatureTweets}></div>
                </div>

                <div onClick={handleRetweets}>
                    <h5 className='features'>Retweets</h5>
                    <div className='active-feature-div' style={activeFeatureRetweets}></div>
                </div>

                <div onClick={handleLikes}>
                    <h5 className='features'>Likes</h5>
                    <div className='active-feature-div' style={activeFeatureLikes}></div>
                </div>
            </div>



            {activeFeatureTweets.borderBottom && (
                <div>
                    {isOwnPage && (
                        <GetTweets tweets={Object.values(tweets?.loggedUserTweets).sort((a, b) => {
                            return new Date(b.createdAt1) - new Date(a.createdAt1)
                        })} />
                    )}
                    {!isOwnPage && (
                        <GetTweets tweets={Object.values(tweets?.userTweets).sort((a, b) => {
                            return new Date(b.createdAt1) - new Date(a.createdAt1)
                        })} />

                    )}
                </div>
            )}

            {activeFeatureLikes.borderBottom && (
                <div>
                    <UserLikes userId={userId} isOwnPage={isOwnPage} />
                </div>
            )}
        </>
    )
}

export default UserProfile;
