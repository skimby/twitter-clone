import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory } from 'react-router-dom';
import CreateTweet from '../CreateTweet';
import GetTweets from '../GetTweets';
import { getFeedTweetsBackend } from '../../store/tweet'
import SignupPage from '../SignupPage';
import './HomePage.css'

function HomePage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [isLoggedIn, setIsLoggedIn] = useState();

    const sessionUser = useSelector(state => state.session.user);
    const tweets = useSelector(state => state.tweets)
    const likes = useSelector(state => state.likes)
    const follows = useSelector(state => state.follows)


    console.log(sessionUser)
    // console.log(Object.values(sessionUser.user).length)
    // useEffect(() => {
    //     if (Object.values(sessionUser.user).length) {
    //         history.push('/welcome')
    //     }
    // }, [])

    useEffect(() => {
        dispatch(getFeedTweetsBackend())
    }, [dispatch, likes, sessionUser, follows])

    useEffect(() => {
        if (sessionUser) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }

    }, [sessionUser])

    // if (sessionUser) {
    return (
        <>
            <div className='home-div'>
                <h2>Home</h2>
            </div>
            <CreateTweet />
            <div>
                <GetTweets tweets={tweets?.feedTweets} />
            </div>
        </>
    )
    // } else {
    //     return (
    //         // <Redirect to='/welcome' >
    //         <SignupPage />
    //         // </Redirect >
    //     )
    // }
}

export default HomePage;
