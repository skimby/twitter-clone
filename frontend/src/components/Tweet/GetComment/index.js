import { Redirect, useHistory, Link } from 'react-router-dom';
import CommentSettingsModal from "../../GetTweets/CommentSettingsModal";
import giphyTag from '../../../images/powered-by-giphy.png'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function GetComment({ comment, tweetId }) {
    const history = useHistory();

    const [isOwnComment, setIsOwnComment] = useState()

    const loggedUser = useSelector(state => state.session.user)

    useEffect(() => {
        if (comment) {
            if (comment?.userId === loggedUser.id) {
                setIsOwnComment(true)
            } else {
                setIsOwnComment(false)
            }
        }
    }, [comment, loggedUser?.id])


    return (
        <>
            <div className='tweet-container' >
                <div className='tweet-profile-img' onClick={() => { history.push(`/${comment?.User?.username}/${comment?.User?.id}`) }}>

                    <img className='profile-img' src={comment?.User?.profileImage} />
                </div>


                <div className='tweet-text-box'>
                    <div className='tweet-user-header'>

                        <div className='username-name-box'>
                            <h5 className='name-username'>{comment?.User?.firstName}
                                {comment?.User?.verified && (
                                    <div className="verified-div2">
                                        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/640px-Twitter_Verified_Badge.svg.png' className='verified-badge' />
                                    </div>
                                )} <span className='thin-styling'>@{comment?.User?.username} • {comment?.updatedAt?.[1]} {comment?.updatedAt?.[2]}</span></h5>
                        </div>

                        {isOwnComment && (
                            <div className='settings-btn' >
                                <CommentSettingsModal comment={comment} />
                            </div>
                        )}
                    </div>

                    <div className='tweet-tweet-box'>
                        <p >{comment?.comment}</p>
                    </div>
                    <div className='tweet-img-gif'>
                        {comment?.image !== null && (
                            <img className='img-gif' src={comment?.image} />
                        )}
                        {comment?.gif !== null && (
                            <>
                                <img className='img-gif' src={comment?.gif} />
                                <img className="padding-top " src={giphyTag} width='110px' />
                            </>
                        )}
                    </div>


                    {/* <div>
                        <p>{comment?.comment}</p>
                        <img className='img-gif' src={comment?.image} width='200' />
                        <img className='img-gif' src={comment?.gif} width='200' />
                        <img className="padding-top " src={giphyTag} width='110px' />
                    </div> */}



                </div>
            </div>
        </>
    )
}
export default GetComment;
