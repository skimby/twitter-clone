import EditFormModal from "../EditTweetModal";
import DeleteTweetModal from "../DeleteTweetModal";
function TweetSettings({ tweet }) {

    return (
        <div className='settings-box'>
            <ul>
                <li><EditFormModal tweetId={tweet?.id} tweet={tweet} /></li>
                <li><DeleteTweetModal tweetId={tweet?.id} /></li>
            </ul>
        </div>
    )
}

export default TweetSettings;
