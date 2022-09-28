import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory, Link } from 'react-router-dom';
import { getFollowingBackend } from '../../store/follow';
import FollowButton from '../FollowButtons/FollowButton';
import FollowingButton from '../FollowButtons/FollowingButton';

function GetFollowsPage({ followingCount }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const { userPage } = location.state;

    const [alreadyFollowing, setAlreadyFollowing] = useState();

    const loggedUser = useSelector(state => state.session.user)
    const follows = useSelector(state => state.follows);
    const following = Object.values(follows?.following);


    useEffect(() => {
        const isFollowing = following.find(follow => loggedUser?.id === follow.userId);

        if (isFollowing) {
            setAlreadyFollowing(true)
        } else {
            setAlreadyFollowing(false)
        }
    }, [following])

    // useEffect(() => {
    //     if (userPage?.id === sessionUser?.id) {
    //         setIsOwnPage(true)
    //         dispatch(getTweetsLoggedUserBackend(parseInt(userPage?.id)))
    //     } else {
    //         setIsOwnPage(false)
    //         dispatch(getTweetsUserBackend(parseInt(userPage?.id)))
    //     }
    // }, [dispatch, userPageId])

    useEffect(() => {
        dispatch(getFollowingBackend(userPage?.id))
    }, [dispatch])

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
                        <h3>{loggedUser?.firstName}</h3>
                        <h5>@{loggedUser?.username}</h5>
                    </div>

                    <div>
                        <h4>Following</h4>
                        {following && (
                            following.map((following, index) => {
                                return (
                                    <div key={index}>
                                        <div className='tweet-profile-img'>
                                            <Link to={{
                                                pathname: `/${userPage?.username}`,
                                                state: {
                                                    userPageId: userPage?.id
                                                }
                                            }}>

                                                <img className='profile-img' src={following?.Following?.profileImage} />

                                            </Link>
                                        </div>
                                        <div>

                                            <h5>{following?.Following?.firstName}  </h5>
                                            <h5>@{following?.Following?.username}</h5>
                                            <p>{following?.Following?.bio}</p>

                                            {alreadyFollowing && (
                                                <FollowingButton userId={loggedUser?.id} userPageId={following?.followerId} />
                                            )}
                                            {!alreadyFollowing && (
                                                <FollowButton userId={loggedUser?.id} userPageId={following?.followerId} />
                                            )}
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>

                </div>

            </div>
        </>
    )
}
export default GetFollowsPage;
