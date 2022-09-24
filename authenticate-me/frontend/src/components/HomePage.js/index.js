import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux"
import CreateTweet from '../CreateTweet';
import GetTweets from '../GetTweets';
import { getFeedTweetsBackend } from '../../store/tweet'
import SignupPage from '../SignupPage';
import './HomePage.css'

function HomePage() {
    const dispatch = useDispatch();
    const [isLoggedIn, setIsLoggedIn] = useState();

    const sessionUser = useSelector(state => state.session);
    const tweets = useSelector(state => state.tweets)

    useEffect(() => {
        dispatch(getFeedTweetsBackend())
    }, [dispatch])

    useEffect(() => {
        if (sessionUser?.user) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }
    }, [])

    return (
        <>
            <div id="middle-container">

                <div className='home-div'>
                    <h2>Home</h2>
                </div>

                <div>
                    <CreateTweet />
                </div>

                <div>

                    <GetTweets tweets={tweets?.feedTweets} />
                </div>
            </div>
        </>

    )
}

export default HomePage;
