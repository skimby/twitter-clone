import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import CreateTweet from '../CreateTweet';
import ExploreTweets from './ExploreTweets';
import { getExploreTweetsBackend } from '../../store/tweet'

import './HomePage.css'

function ExplorePage() {
    const dispatch = useDispatch();

    const likes = useSelector(state => state.likes)
    const follows = useSelector(state => state.follows)
    const retweets = useSelector(state => state.retweets)
    const tweets = useSelector(state => state.tweets)

    useEffect(() => {
        dispatch(getExploreTweetsBackend())
    }, [dispatch, likes, follows, retweets])

    return (
        <>
            <div className='home-div'>
                <h2>Explore</h2>
            </div>

            <div>
                <CreateTweet />
            </div>

            <div>
                <ExploreTweets tweets={tweets} />
            </div>

        </>

    )
}

export default ExplorePage;
