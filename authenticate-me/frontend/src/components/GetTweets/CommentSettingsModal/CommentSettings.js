import EditCommentModal from "./EditCommentModal";
import DeleteTweetModal from "../DeleteTweetModal";

function CommentSettings({ comment, tweetId }) {

    console.log(tweetId)
    return (
        <div className='settings-box'>
            <ul>
                <li><EditCommentModal commentId={comment?.id} comment={comment} /></li>
                <li><DeleteTweetModal tweetId={comment?.id} /></li>
            </ul>
        </div>
    )
}

export default CommentSettings;
