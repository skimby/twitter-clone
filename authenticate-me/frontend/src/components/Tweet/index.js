import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneTweetBackend } from '../../store/tweet';
import GetTweets from '../GetTweets';

function Tweet() {
    let { tweetId } = useParams();
    tweetId = parseInt(tweetId);
    const dispatch = useDispatch();

    const tweet = useSelector(state => state.tweets);

    console.log(tweet?.currentTweet)
    useEffect(() => {
        dispatch(getOneTweetBackend(tweetId));
    }, [dispatch])

    return (
        <>
            <h1>Tweet</h1>
            <p>{tweetId}</p>
            <GetTweets tweets={tweet?.currentTweet} />
        </>
    )
}
export default Tweet;
