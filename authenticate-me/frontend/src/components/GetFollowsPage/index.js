import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory, Link } from 'react-router-dom';
import { getFollowingBackend, getLoggedUserFollowingBackend } from '../../store/follow';
import EachFollow from './EachFollow';
import FollowButton from '../FollowButtons/FollowButton';
import FollowingButton from '../FollowButtons/FollowingButton';

function GetFollowsPage({ followingCount }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const { userPage } = location.state;

    const [alreadyFollowing, setAlreadyFollowing] = useState();
    const [isOwnPage, setIsOwnPage] = useState();

    const loggedUser = useSelector(state => state.session.user)
    const follows = useSelector(state => state.follows);
    const following = Object.values(follows?.following);
    const loggedUserFollowing = Object.values(follows?.loggedUserFollowing);


    // useEffect(() => {

    //     const isFollowing = loggedUserFollowing.find(follow => loggedUser?.id === follow?.followerId);

    //     if (isFollowing) {
    //         setAlreadyFollowing(true)
    //     } else {
    //         setAlreadyFollowing(false)
    //     }
    // }, [follows, follows?.loggedUserFollowing])

    useEffect(() => {
        if (parseInt(userPage?.id) === loggedUser?.id) {
            setIsOwnPage(true)
        } else {
            setIsOwnPage(false)
        }
    }, [dispatch, userPage])

    useEffect(() => {
        dispatch(getFollowingBackend(userPage?.id))
        dispatch(getLoggedUserFollowingBackend())
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
                            following.map((follow, index) => {
                                return (
                                    <div key={index}>
                                        <EachFollow follow={follow} userPage={userPage} isOwnPage={isOwnPage} />
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
