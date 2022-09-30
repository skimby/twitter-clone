import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getExploreTweetsBackend } from '../../../store/tweet'
import GetTweets from '../../GetTweets';

function ExploreTweets() {
    const dispatch = useDispatch();
    const tweets = useSelector(state => state.tweets);

    useEffect(() => {
        dispatch(getExploreTweetsBackend())
    }, [dispatch])
    return (
        <>
            <h1>explore page</h1>
            <GetTweets tweets={tweets?.exploreTweets} />
        </>
    )
}

export default ExploreTweets;
