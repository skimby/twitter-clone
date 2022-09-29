import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { getFollowersBackend, getLoggedUserFollowingBackend } from '../../store/follow';
import { getUserBackend } from '../../store/user';
import EachFollower from './EachFollower';


function GetFollowersPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { userId } = useParams();

    const [isOwnPage, setIsOwnPage] = useState();

    const loggedUser = useSelector(state => state.session.users)
    const user = useSelector(state => state.users)
    const follows = useSelector(state => state.follows);
    const followers = Object.values(follows?.followers);


    useEffect(() => {
        if (parseInt(userId) === loggedUser?.id) {
            setIsOwnPage(true)
        } else {
            setIsOwnPage(false)
        }
    }, [dispatch, userId])

    useEffect(() => {
        dispatch(getFollowersBackend(userId))
        dispatch(getLoggedUserFollowingBackend())
    }, [dispatch])

    useEffect(() => {
        dispatch(getUserBackend(userId))
    }, [dispatch, userId])

    const handleBack = () => {
        history.goBack()
    }
    return (
        <>
            <div id="middle-container">
                <div>
                    <div>
                        <i className="fa-solid fa-arrow-left-long" onClick={handleBack}></i>
                    </div>
                    <div>
                        <h3>{user?.User?.firstName}</h3>
                        <h5>@{user?.User?.username}</h5>
                    </div>

                    <div>
                        <h4>Followers</h4>
                        {followers && (
                            followers.map((follow, index) => {
                                return (
                                    <div key={index}>
                                        <EachFollower follow={follow} isOwnPage={isOwnPage} />
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
export default GetFollowersPage;
