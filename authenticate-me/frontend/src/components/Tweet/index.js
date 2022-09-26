import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneTweetBackend } from '../../store/tweet';
import GetOneTweet from './GetOneTweet';

function Tweet() {
    let { tweetId } = useParams();
    tweetId = parseInt(tweetId);
    const dispatch = useDispatch();

    const tweet = useSelector(state => state.tweets);

    useEffect(() => {
        dispatch(getOneTweetBackend(tweetId));
    }, [dispatch])

    return (
        <>
            <GetOneTweet tweet={tweet?.currentTweet} />
        </>
    )
}
export default Tweet;
