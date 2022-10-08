import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { getFollowingBackend, getLoggedUserFollowingBackend } from '../../store/follow';
import { getUserBackend } from '../../store/user';
import EachFollow from './EachFollow';


function GetFollowsPage({ followingCount }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { userId } = useParams();

    const [isOwnPage, setIsOwnPage] = useState();

    const user = useSelector(state => state.users)
    const loggedUser = useSelector(state => state.session.user)
    const follows = useSelector(state => state.follows);
    const following = Object.values(follows?.following);

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


            <div>
                <h4>Following</h4>
                {following && (
                    following.map((follow, index) => {
                        return (
                            <div key={index}>
                                <EachFollow follow={follow} isOwnPage={isOwnPage} />
                            </div>
                        )
                    })
                )}
            </div>

        </>
    )
}
export default GetFollowsPage;
