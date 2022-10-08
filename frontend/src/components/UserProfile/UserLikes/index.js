import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory, Link, useParams } from 'react-router-dom';
import { getUserLikesBackend } from '../../../store/like'
import CreateCommentModal from '../../CreateCommentModal';
import Retweets from '../../Retweet';
import Likes from '../../Likes';
import giphyTag from '../../../images/powered-by-giphy.png'

function UserLikes({ userId }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const likes = useSelector(state => state.likes.tweet)

    const [newComment, setNewComment] = useState(true)


    useEffect(() => {
        dispatch(getUserLikesBackend(userId))
    }, [dispatch, userId])

    return (
        <>
            {likes && (
                Object.values(likes).map((like, index) => {
                    return (
                        <div className='tweet-container' key={index}>
                            <div className='tweet-profile-img' onClick={() => { history.push(`/${like?.Tweet?.User?.username}/${like?.Tweet?.User?.id}`) }}>

                                <img className='profile-img' src={like?.Tweet?.User?.profileImage} />
                            </div>


                            <div className='tweet-text-box'>
                                <div className='tweet-user-header'>
                                    <div className='username-name-box'>
                                        <h5 className='name-username' onClick={() => { history.push(`/${like?.Tweet?.User?.username}/${like?.Tweet?.User?.id}`) }}>
                                            {like?.Tweet?.User?.firstName}

                                            <span className='thin-styling'> @{like?.Tweet?.User?.username} · {like?.Tweet?.updatedAt?.[1]} {like?.Tweet?.updatedAt?.[2]}</span></h5>
                                    </div>


                                    {/* <div className='settings-btn' >
                                        <TweetSettingsModal tweet={tweet} />
                                    </div> */}
                                    <div className='tweet-tweet-box'>
                                        <p onClick={() => { history.push(`/${like?.Tweet?.User?.username}/tweets/${like?.Tweet.id}`) }}>
                                            {like?.Tweet?.tweet}
                                        </p>
                                    </div>

                                    <div className='tweet-img-gif'>
                                        {like.Tweet?.image !== null && (
                                            <img className='img-gif' src={like.Tweet?.image} />
                                        )}
                                        {like.Tweet?.gif !== null && (
                                            <>
                                                <img className='img-gif' src={like.Tweet?.gif} />
                                                <img className="padding-top " src={giphyTag} width='110px' />
                                            </>
                                        )}
                                    </div>

                                    <div className='tweet-icons-box'>

                                        <div className='tweet-icon'>
                                            <CreateCommentModal commentCount={like?.Tweet?.commentCount} tweet={like?.Tweet} newComment={newComment} />
                                        </div>
                                        <div className='tweet-icon'>
                                            <Retweets retweetCount={like?.Tweet?.retweetCount} tweet={like?.Tweet} />
                                        </div>
                                        <div className='tweet-icon'>
                                            <Likes likeCount={like?.Tweet?.likeCount} tweet={like?.Tweet} />
                                        </div>
                                        {/* <i onClick={handleLike(tweet)} className="fa-regular fa-heart"></i>{tweet?.likeCount} */}

                                    </div>








                                </div>
                            </div>


                        </div>
                    )
                })
            )}
        </>
    )
}

export default UserLikes;
