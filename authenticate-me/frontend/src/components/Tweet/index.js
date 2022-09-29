import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { getOneTweetBackend } from '../../store/tweet';
import GetOneTweet from './GetOneTweet';

function Tweet() {
    let { tweetId } = useParams();
    tweetId = parseInt(tweetId);

    const location = useLocation();
    const { userPageId } = location.state

    console.log(userPageId)
    // const dispatch = useDispatch();

    // const tweet = useSelector(state => state.tweets);

    // useEffect(() => {
    //     dispatch(getOneTweetBackend(tweetId));
    // }, [dispatch])

    return (
        <>
            <GetOneTweet tweetId={tweetId} userPageId={userPageId} />
        </>
    )
}
export default Tweet;
