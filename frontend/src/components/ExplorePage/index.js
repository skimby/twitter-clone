import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import CreateTweet from '../CreateTweet';
import ExploreTweets from './ExploreTweets';
import { getFeedTweetsBackend } from '../../store/tweet'

import './HomePage.css'

function ExplorePage() {
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session);
    const likes = useSelector(state => state.likes)


    useEffect(() => {
        dispatch(getFeedTweetsBackend())
    }, [dispatch, likes, sessionUser])



    return (
        <>


            <div className='home-div'>
                <h2>Explore</h2>
            </div>

            <div>
                <CreateTweet />
            </div>

            <div>
                <ExploreTweets />
            </div>

        </>

    )
}

export default ExplorePage;
