import { useParams } from 'react-router-dom';
import GetOneTweet from './GetOneTweet';

function Tweet() {
    let { tweetId, userId } = useParams();
    tweetId = parseInt(tweetId);
    userId = parseInt(userId);

    return (
        <>
            <GetOneTweet tweetId={tweetId} userId={userId} />
        </>
    )
}
export default Tweet;
