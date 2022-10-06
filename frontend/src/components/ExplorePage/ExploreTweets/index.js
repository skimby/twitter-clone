import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getExploreTweetsBackend } from '../../../store/tweet'
import GetTweets from '../../GetTweets';

function ExploreTweets() {
    const dispatch = useDispatch();
    const tweets = useSelector(state => state.tweets);

    let allTweets = tweets?.exploreTweets
    const likes = useSelector(state => state.likes)


    useEffect(() => {
        dispatch(getExploreTweetsBackend())
    }, [dispatch, likes])


    return (
        <>
            <GetTweets tweets={Object.values(allTweets).sort((a, b) => {
                return new Date(b.createdAt1) - new Date(a.createdAt1)
            })} />
        </>
    )
}

export default ExploreTweets;
