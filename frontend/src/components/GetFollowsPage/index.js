import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getFollowingBackend, getLoggedUserFollowingBackend } from '../../store/follow';
import { getUserBackend } from '../../store/user';
import EachFollow from './EachFollow';


function GetFollowsPage({ followingCount }) {
    const dispatch = useDispatch();
    const { userId } = useParams();

    const [isOwnPage, setIsOwnPage] = useState();

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

    return (
        <>


            <div>
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
