import { useParams } from 'react-router-dom';
import GetOneTweet from './GetOneTweet';

function Tweet() {
    let { tweetId, userId } = useParams();
    tweetId = parseInt(tweetId);
    userId = parseInt(userId);

    // const { userPageId } = location.state

    // const dispatch = useDispatch();

    // const tweet = useSelector(state => state.tweets);

    // useEffect(() => {
    //     dispatch(getOneTweetBackend(tweetId));
    // }, [dispatch])

    return (
        <>
            <GetOneTweet tweetId={tweetId} userId={userId} />
        </>
    )
}
export default Tweet;
