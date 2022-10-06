import EditCommentModal from "./EditCommentModal";
import DeleteCommentModal from "./DeleteCommentModal";
import CreateCommentModal from '../../CreateCommentModal'
import logo from '../../../images/twitter-logo.png'
import { useEffect, useState } from "react";
import { getOneTweetBackend } from '../../../store/tweet'
import { useDispatch, useSelector } from "react-redux";


function CommentSettings({ comment, setShowModal }) {
    const [edit, setEdit] = useState(true)
    const dispatch = useDispatch();

    const tweet = useSelector(state => state.tweets.currentTweet)

    useEffect(() => {
        dispatch(getOneTweetBackend(comment?.tweetId))
    }, [dispatch])


    return (
        <>
            <div className="settings-header">
                <div className="x-box" onClick={() => setShowModal(false)}>
                    <i className="fa-solid fa-x"></i>
                </div>
                <div className="settings-logo-box">
                    <img src={logo} className='logo-container-module' />
                </div>
            </div>

            <div className='settings-box'>
                <h2 className="padding">Change or remove your comment</h2>
                <ul>
                    <li><CreateCommentModal commentId={comment?.id} comment={comment} edit={edit} tweet={tweet} setShowModal={setShowModal} /></li>
                    <li><DeleteCommentModal comment={comment} /></li>
                </ul>
            </div>


        </>
    )
}

export default CommentSettings;
