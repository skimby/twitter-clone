import EditCommentModal from "./EditCommentModal";
import DeleteTweetModal from "../DeleteTweetModal";

function CommentSettings({ comment }) {


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
