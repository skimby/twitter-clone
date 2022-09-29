import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from 'react-router-dom';
import { getFollowersBackend, getLoggedUserFollowingBackend } from '../../store/follow';
import EachFollower from './EachFollower';


function GetFollowersPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const { userPage } = location.state;

    const [isOwnPage, setIsOwnPage] = useState();

    const loggedUser = useSelector(state => state.session.user)
    const follows = useSelector(state => state.follows);
    const followers = Object.values(follows?.followers);

    useEffect(() => {
        if (parseInt(userPage?.id) === loggedUser?.id) {
            setIsOwnPage(true)
        } else {
            setIsOwnPage(false)
        }
    }, [dispatch, userPage])

    useEffect(() => {
        dispatch(getFollowersBackend(userPage?.id))
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
                        <h3>{userPage?.firstName}</h3>
                        <h5>@{userPage?.username}</h5>
                    </div>

                    <div>
                        <h4>Followers</h4>
                        {followers && (
                            followers.map((follow, index) => {
                                return (
                                    <div key={index}>
                                        <EachFollower follow={follow} userPage={userPage} isOwnPage={isOwnPage} />
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
