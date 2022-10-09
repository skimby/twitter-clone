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

    const loggedUser = useSelector(state => state.session.user)
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


            <div>
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


        </>
    )
}
export default GetFollowersPage;
