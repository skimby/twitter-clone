import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getUserBackend } from '../../store/user'

function UserProfile({ sessionUser }) {
    const dispatch = useDispatch();

    const userPage = useSelector(state => state.users);
    console.log(userPage)

    useEffect(() => {
        dispatch(getUserBackend(sessionUser?.id))
    }, [dispatch, sessionUser])

    return (
        <>
            <div id="middle-container">

                <div>
                    <div>
                        <i className="fa-solid fa-arrow-left-long"></i>
                    </div>
                    <h5>@{userPage?.User?.username}</h5>
                    <p>{userPage?.User?.tweetCount} Tweets</p>
                </div>

                <h1>User Profile</h1>
            </div>
        </>
    )
}

export default UserProfile;
