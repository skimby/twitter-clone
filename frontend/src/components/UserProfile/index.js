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
import UserRetweets from './UserRetweets';
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
    const user = useSelector(state => state.users.User);
    const follows = useSelector(state => state.follows)
    const likes = useSelector(state => state.likes)
    const retweets = useSelector(state => state.retweets)

    const loggedUserFollowingTest = Object.values(useSelector(state => state.follows.loggedUserFollowing));
    let joinedDate = user?.createdAt


    useEffect(() => {
        setActiveFeatureTweets(blueLineStyling)
        setActiveFeatureRetweets(noStyling)
        setActiveFeatureLikes(noStyling)
    }, [user])

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
    }, [dispatch, userId, likes, sessionUser?.id, retweets])

    useEffect(() => {
        dispatch(getLoggedUserFollowingBackend())
        dispatch(getFollowingBackend(userId, isOwnPage))
    }, [dispatch, userId, isOwnPage])

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
    }, [loggedUserFollowingTest, userId])

    const handleBack = () => {
        history.push('/')
    }

    const handleTweets = (e) => {
        e.preventDefault();
        setActiveFeatureTweets(blueLineStyling)
        setActiveFeatureRetweets(noStyling)
        setActiveFeatureLikes(noStyling)
    }

    const handleRetweets = (e) => {
        e.preventDefault();
        setActiveFeatureRetweets(blueLineStyling)
        setActiveFeatureLikes(noStyling)
        setActiveFeatureTweets(noStyling)
    }

    const handleLikes = (e) => {
        e.preventDefault();
        setActiveFeatureLikes(blueLineStyling)
        setActiveFeatureTweets(noStyling)
        setActiveFeatureRetweets(noStyling)
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
                <img className='cover-img' src={user?.coverImage} alt='profile page cover' />
            </div>

            <div className='user-profile-img-big-container'>
                <img className='user-profile-img-big' src={user?.profileImage} alt='profile user' />
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
                <div className='profile-box-text'>
                    <h5 className='user-bold-styling'>{user?.firstName}</h5>
                    {user?.verified && (
                        <div className="verified-div2">
                            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/640px-Twitter_Verified_Badge.svg.png' className='verified-badge' alt='verified badge icon' />
                        </div>
                    )}

                </div>
                <p className='p-gray-small'>@{user?.username}</p>
                <p className='no-margin'>{user?.bio}</p>

                <div className='website-calendar-box'>
                    {user?.website && (
                        <div className='website-box'>
                            <i className="fa-solid fa-link gray-icon"></i>
                            <Link
                                to={{ pathname: user?.website }} target="_blank">
                                <p className='gray-p'>{user?.website}</p>
                            </Link>
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
                            <p className='gray-p follower-styling pointer' onClick={() => {
                                history.push(`/${user?.username}/${userId}/follows`)
                            }}><span className='bold'>{user?.followingCount}</span> Following</p>

                            <p className='gray-p follower-styling pointer' onClick={() => {
                                history.push(`/${user?.username}/${userId}/follows`)
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
                    <h5 className='features pointer'>Tweets</h5>
                    <div className='active-feature-div' style={activeFeatureTweets}></div>
                </div>

                <div onClick={handleRetweets}>
                    <h5 className='features pointer'>Retweets</h5>
                    <div className='active-feature-div' style={activeFeatureRetweets}></div>
                </div>

                <div onClick={handleLikes}>
                    <h5 className='features pointer'>Likes</h5>
                    <div className='active-feature-div' style={activeFeatureLikes}></div>
                </div>
            </div>



            {
                activeFeatureTweets?.borderBottom && (
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
                )
            }

            {
                activeFeatureRetweets?.borderBottom && (
                    <div>
                        <UserRetweets userId={userId} isOwnPage={isOwnPage} />
                    </div>
                )
            }

            {
                activeFeatureLikes?.borderBottom && (
                    <div>
                        <UserLikes userId={userId} isOwnPage={isOwnPage} />
                    </div>
                )
            }
        </>
    )
}

export default UserProfile;
