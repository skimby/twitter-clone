import React, { useState } from "react";
import { CommentModal } from "../../context/Modal"
import CreateComment from "./CreateComment";

function CreateCommentModal({ commentCount, comment, tweet, singleTweet, edit, setShowModalSettings, newComment }) {
    const [showModalComment, setShowModalComment] = useState();

    return (
        <>
            {!edit && (
                <>
                    <i onClick={() => setShowModalComment(true)} className="fa-regular fa-comment gray-icon pointer"></i>
                    {!singleTweet && (
                        <p className="gray-p">{commentCount}</p>
                    )}
                    {showModalComment && (
                        <CommentModal onClose={() => setShowModalComment(false)}>
                            <CreateComment setShowModalComment={setShowModalComment} tweetId={tweet?.id} tweet={tweet} edit={edit} newComment={newComment}
                            />

                        </CommentModal>
                    )}
                </>
            )}

            {edit && (
                <>
                    <button onClick={() => setShowModalComment(true)} className="black-btn">Edit Comment</button>

                    {showModalComment && (
                        <CommentModal onClose={() => setShowModalComment(false)}>
                            <CreateComment setShowModalComment={setShowModalComment} tweetId={tweet?.id} tweet={tweet} edit={edit} currentComment={comment} setShowModalSettings={setShowModalSettings}
                            />

                        </CommentModal>
                    )}
                </>
            )}
        </>
    );
}

export default CreateCommentModal;
