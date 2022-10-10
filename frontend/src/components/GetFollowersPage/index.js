import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getFollowersBackend, getLoggedUserFollowingBackend } from '../../store/follow';
import { getUserBackend } from '../../store/user';
import EachFollower from './EachFollower';


function GetFollowersPage() {
    const dispatch = useDispatch();
    const { userId } = useParams();

    const [isOwnPage, setIsOwnPage] = useState();

    const loggedUser = useSelector(state => state.session.user)
    const follows = useSelector(state => state.follows);
    const followers = Object.values(follows?.followers);



    useEffect(() => {
        if (parseInt(userId) === loggedUser?.id) {
            setIsOwnPage(true)
        } else {
            setIsOwnPage(false)
        }
    }, [dispatch, userId, loggedUser?.id])

    useEffect(() => {
        dispatch(getFollowersBackend(userId))
        dispatch(getLoggedUserFollowingBackend())
    }, [dispatch, userId])

    useEffect(() => {
        dispatch(getUserBackend(userId))
    }, [dispatch, userId])



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
