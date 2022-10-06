import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getExploreTweetsBackend } from '../../../store/tweet'
import GetTweets from '../../GetTweets';

function ExploreTweets() {
    const dispatch = useDispatch();
    const tweets = useSelector(state => state.tweets);
    let allTweets = Object.values(tweets?.exploreTweets).sort(function (a, b) { return 0.5 - Math.random() });;


    useEffect(() => {
        dispatch(getExploreTweetsBackend())
    }, [dispatch])


    return (
        <>
            <GetTweets tweets={allTweets} />
        </>
    )
}

export default ExploreTweets;
