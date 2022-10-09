import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import CreateTweet from '../CreateTweet';
import GetTweets from '../GetTweets';
import { getFeedTweetsBackend } from '../../store/tweet'
import './HomePage.css'

function HomePage() {
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);
    const tweets = useSelector(state => state.tweets)
    const likes = useSelector(state => state.likes)
    const follows = useSelector(state => state.follows)
    const retweets = useSelector(state => state.retweets)

    useEffect(() => {
        dispatch(getFeedTweetsBackend())
    }, [dispatch, likes, sessionUser, follows, retweets])

    return (
        <>
            <div className='home-div'>
                <h2>Home</h2>
            </div>
            <CreateTweet />

            <div>
                <GetTweets tweets={Object.values(tweets?.feedTweets).sort((a, b) => {
                    return new Date(b.createdAt1) - new Date(a.createdAt1)
                })} />
            </div>
        </>
    )

}

export default HomePage;
