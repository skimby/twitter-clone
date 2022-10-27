import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { getFollowingBackend, getLoggedUserFollowingBackend } from '../../store/follow';
import { getUserBackend } from '../../store/user';
import GetFollowsPage from '../GetFollowsPage';
import GetFollowersPage from '../GetFollowersPage';
// import EachFollow from './EachFollow';


function UserFollows() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { userId } = useParams();

    const [isOwnPage, setIsOwnPage] = useState();

    const blueLineStyling = {
        borderBottom: "4px solid rgb(29, 155, 240)",
        paddingTop: '10px'
    }
    const noStyling = {}


    const [openFollows, setOpenFollows] = useState(blueLineStyling);
    const [openFollowers, setOpenFollwers] = useState(noStyling);

    const user = useSelector(state => state.users)
    const loggedUser = useSelector(state => state.session.user)
    const follows = useSelector(state => state.follows);

    useEffect(() => {
        dispatch(getUserBackend(userId))
    }, [dispatch, userId])


    useEffect(() => {
        if (loggedUser) {
            if (parseInt(userId) === loggedUser?.id) {

                setIsOwnPage(true)
            } else {
                setIsOwnPage(false)
            }
        }
    }, [dispatch, userId, loggedUser])

    useEffect(() => {
        dispatch(getFollowingBackend(userId))
        dispatch(getLoggedUserFollowingBackend())
    }, [dispatch, userId, follows?.loggedUserFollowing])

    const handleBack = () => {
        history.goBack();
    }

    const handleFollow = () => {
        setOpenFollows(blueLineStyling)
        setOpenFollwers(noStyling)
    }

    const handleFollowers = () => {
        setOpenFollwers(blueLineStyling)
        setOpenFollows(noStyling)
    }
    return (
        <>
            <div className='user-profile-header'>
                <div className='x-box'>
                    <i className="fa-solid fa-arrow-left-long" onClick={handleBack}></i>
                </div>
                <div className='user-information-box'>
                    <h5 className='user-bold-styling'>{user?.User?.username}</h5>
                    <p className='p-gray-small'>@{user?.User?.username}</p>
                </div>
            </div>

            <div className='features-container-follows'>
                <div onClick={handleFollow}>
                    <h5 className='features pointer'>Following</h5>
                    <div className='active-feature-div' style={openFollows}></div>
                </div>

                <div onClick={handleFollowers}>
                    <h5 className='features pointer'>Followers</h5>
                    <div className='active-feature-div' style={openFollowers}></div>
                </div>


            </div>


            {openFollows?.borderBottom && (
                <GetFollowsPage />
            )}
            {openFollowers?.borderBottom && (
                <GetFollowersPage />
            )}

        </>
    )
}
export default UserFollows;
