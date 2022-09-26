import { Redirect, useHistory, Link } from 'react-router-dom';
import CommentSettingsModal from "../../GetTweets/CommentSettingsModal";

function GetComment({ comment, tweetId }) {
    const history = useHistory();

    return (
        <>
            <div className='profile-img'>
                <Link to={{
                    pathname: `/${comment?.User?.username}`,
                    state: {
                        userPageId: comment?.User?.id
                    }
                }}>
                    <img className='profile-img' src={comment?.User?.profileImage} />
                </Link>

            </div>

            <div className='tweet-text-box'>
                <div>
                    <Link to={{
                        pathname: `/${comment?.User?.username}`,
                        state: {
                            userPageId: comment?.User?.id
                        }
                    }}>
                        <h5>
                            {comment?.User?.firstName}</h5>
                    </Link>

                    <h5><span className='thin-styling'>@{comment?.User?.username} • {comment?.updatedAt?.[1]} {comment?.updatedAt?.[2]}</span></h5>
                </div>

                <div>
                    <p>{comment?.comment}</p>
                </div>


                <div className='settings-btn' >
                    <CommentSettingsModal comment={comment} />
                </div>

            </div>
        </>
    )
}
export default GetComment;
