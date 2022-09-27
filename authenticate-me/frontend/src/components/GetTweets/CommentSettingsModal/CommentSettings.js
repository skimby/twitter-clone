import EditCommentModal from "./EditCommentModal";
import DeleteCommentModal from "./DeleteCommentModal";

function CommentSettings({ comment }) {


    return (
        <div className='settings-box'>
            <ul>
                <li><EditCommentModal commentId={comment?.id} comment={comment} /></li>
                <li><DeleteCommentModal comment={comment} /></li>
            </ul>
        </div>
    )
}

export default CommentSettings;
