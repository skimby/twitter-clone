import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux"
import CreateTweet from '../CreateTweet';
import GetTweets from '../GetTweets';
import SignupPage from '../SignupPage';
import './HomePage.css'

function HomePage() {
    const dispatch = useDispatch();
    const [isLoggedIn, setIsLoggedIn] = useState();

    const sessionUser = useSelector(state => state.session);

    console.log(isLoggedIn)
    console.log(sessionUser)

    useEffect(() => {
        if (sessionUser?.user) {
            setIsLoggedIn(true)
            console.log('is logged in')
        } else {
            setIsLoggedIn(false)
            console.log('is not logged in')
        }
    }, [])

    return (
        <>
            <div className='home-div'>
                <h2>Home</h2>
            </div>

            <div>
                <CreateTweet />
            </div>

            <div>
                <GetTweets />
            </div>
        </>

    )
}

export default HomePage;
