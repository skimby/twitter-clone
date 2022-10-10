import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getExploreTweetsBackend } from '../../../store/tweet'
import GetTweets from '../../GetTweets';

function ExploreTweets({ tweets }) {
    const dispatch = useDispatch();
    // const tweets = useSelector(state => state.tweets);

    let allTweets = tweets?.exploreTweets
    // const likes = useSelector(state => state.likes)
    // const follows = useSelector(state => state.follows)
    // const retweets = useSelector(state => state.retweets)

    // useEffect(() => {
    //     dispatch(getExploreTweetsBackend())
    // }, [dispatch, likes, follows, retweets])


    return (
        <>
            <GetTweets tweets={Object.values(allTweets).sort((a, b) => {
                return new Date(b.createdAt1) - new Date(a.createdAt1)
            })} />
        </>
    )
}

export default ExploreTweets;
