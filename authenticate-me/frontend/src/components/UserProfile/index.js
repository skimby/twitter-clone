import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useLocation, Link } from 'react-router-dom';
import { getUserBackend } from '../../store/user'
import { getTweetsUserBackend, getTweetsLoggedUserBackend } from '../../store/tweet'
import FollowingButton from '../FollowButtons/FollowingButton';
import FollowButton from '../FollowButtons/FollowButton';
import { getFollowingBackend } from '../../store/follow';
import GetTweets from '../GetTweets';
import GetFollowsPage from '../GetFollowsPage';
import './UserProfile.css'


function UserProfile({ sessionUser }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const { userPageId } = location.state;

    const [isOwnPage, setIsOwnPage] = useState();
    const [alreadyFollowing, setAlreadyFollowing] = useState();
    const tweets = useSelector(state => state.tweets)
    const loggedUser = useSelector(state => state.session.user)
    const user = useSelector(state => state.users.User);
    const follows = useSelector(state => state.follows)
    const following = Object.values(follows?.following)
    // const user = userPage?.User;
    let joinedDate = user?.createdAt


    useEffect(() => {
        // if (!userPage?.User) {
        dispatch(getUserBackend(userPageId))
        // }
    }, [dispatch, userPageId, follows])

    useEffect(() => {
        if (userPageId === sessionUser?.id) {
            setIsOwnPage(true)
            dispatch(getTweetsLoggedUserBackend(parseInt(userPageId)))
        } else {
            setIsOwnPage(false)
            dispatch(getTweetsUserBackend(parseInt(userPageId)))
        }
    }, [dispatch, userPageId])

    useEffect(() => {
        dispatch(getFollowingBackend(userPageId))
    }, [dispatch, userPageId])

    useEffect(() => {
        // if (following.length) {
        const isFollowing = following.find(follow => loggedUser?.id === follow.userId);

        if (isFollowing) {
            setAlreadyFollowing(true)
        } else {
            setAlreadyFollowing(false)
        }
        // }
    }, [following])

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
                        <FollowingButton userId={loggedUser?.id} userPageId={userPageId} />
                    )}
                    {!alreadyFollowing && (
                        <FollowButton userId={loggedUser?.id} userPageId={userPageId} />
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

                    <Link to={{
                        pathname: '/follows',
                        state: {}
                    }}>
                        <p >{user?.followingCount} Following</p>
                    </Link>
                    {/* <GetFollowsPage followingCount={user?.followingCount} /> */}
                    {/* <FollowingModal followingCount={user?.followingCount} /> */}
                    {/* <p>{user?.followingCount} Following</p> */}
                    <p>{user?.followerCount} Followers</p>
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
