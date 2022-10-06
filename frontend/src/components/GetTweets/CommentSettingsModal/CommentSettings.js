import EditCommentModal from "./EditCommentModal";
import DeleteCommentModal from "./DeleteCommentModal";
import CreateCommentModal from '../../CreateCommentModal'
import logo from '../../../images/twitter-logo.png'
import { useState } from "react";


function CommentSettings({ comment, setShowModal }) {
    const [edit, setEdit] = useState(true)

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
                    <li><CreateCommentModal commentId={comment?.id} comment={comment} edit={edit} /></li>
                    <li><DeleteCommentModal comment={comment} /></li>
                </ul>
            </div>


        </>
    )
}

export default CommentSettings;
