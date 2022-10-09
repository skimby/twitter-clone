import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory, Link, useParams } from 'react-router-dom';
import { getUserLikesBackend } from '../../../store/like'
import CreateCommentModal from '../../CreateCommentModal';
import Retweets from '../../Retweet';
import EachLike from '../EachLike';
import Likes from '../../Likes';
import giphyTag from '../../../images/powered-by-giphy.png'

function UserLikes({ userId, isOwnPage }) {
    const dispatch = useDispatch();
    const history = useHistory();

    let likes = useSelector(state => state.likes)

    const [newComment, setNewComment] = useState(true)

    useEffect(() => {
        dispatch(getUserLikesBackend(userId, isOwnPage))
    }, [dispatch, userId])

    console.log(likes?.loggedUserLikes[0])

    return (
        <>
            {!isOwnPage && (
                <>
                    {likes?.userLikes && (
                        Object.values(likes?.userLikes).map((like, index) => {
                            return (
                                <div className='tweet-container' key={index}>
                                    <div className='tweet-profile-img' onClick={() => { history.push(`/${like?.User?.username}/${like?.User?.id}`) }}>

                                        <img className='profile-img' src={like?.User?.profileImage} />
                                    </div>

                                    <div className='tweet-text-box'>
                                        <div className='tweet-user-header'>
                                            <div className='username-name-box'>
                                                <h5 className='name-username' onClick={() => { history.push(`/${like?.User?.username}/${like?.User?.id}`) }}>
                                                    {like?.User?.firstName}

                                                    {like?.User?.verified && (
                                                        <div className="verified-div2">
                                                            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/640px-Twitter_Verified_Badge.svg.png' className='verified-badge' />
                                                        </div>
                                                    )}

                                                    <span className='thin-styling'> @{like?.User?.username} · {like?.updatedAt?.[1]} {like?.updatedAt?.[2]}</span></h5>
                                            </div>
                                        </div>

                                        {/* <div className='settings-btn' >
                                        <TweetSettingsModal tweet={tweet} />
                                    </div> */}
                                        <div className='tweet-tweet-box'>
                                            <p className='pointer' onClick={() => { history.push(`/${like?.User?.username}/tweets/${like?.id}`) }}>
                                                {like?.tweet}
                                            </p>
                                        </div>

                                        <div className='tweet-img-gif'>
                                            {like?.image !== null && (
                                                <img className='img-gif' src={like?.image} />
                                            )}
                                            {like?.gif !== null && (
                                                <>
                                                    <img className='img-gif' src={like?.gif} />
                                                    <img className="padding-top " src={giphyTag} width='110px' />
                                                </>
                                            )}
                                        </div>

                                        <div className='tweet-icons-box'>

                                            <div className='tweet-icon'>
                                                <CreateCommentModal commentCount={like?.commentCount} tweet={like} newComment={newComment} />
                                            </div>
                                            <div className='tweet-icon'>
                                                <Retweets retweetCount={like?.retweetCount} tweet={like} />
                                            </div>

                                            <div className='tweet-icon'>
                                                <Likes likeCount={like?.likeCount} tweet={like} />
                                            </div>
                                            {/* <i onClick={handleLike(tweet)} className="fa-regular fa-heart"></i>{tweet?.likeCount} */}

                                        </div>
                                    </div>
                                </div>

                            )
                        })
                    )}
                </>
            )}

            {
                isOwnPage && (
                    <>
                        {likes?.loggedUserLikes && (
                            Object.values(likes?.loggedUserLikes).map((like, index) => {
                                return (
                                    <div className='tweet-container' key={index}>
                                        <div className='tweet-profile-img' onClick={() => { history.push(`/${like?.User?.username}/${like?.User?.id}`) }}>

                                            <img className='profile-img' src={like?.User?.profileImage} />
                                        </div>

                                        <div className='tweet-text-box'>
                                            <div className='tweet-user-header'>
                                                <div className='username-name-box'>
                                                    <h5 className='name-username' onClick={() => { history.push(`/${like?.User?.username}/${like?.Tweet?.User?.id}`) }}>
                                                        {like?.User?.firstName}

                                                        {like?.User?.verified && (
                                                            <div className="verified-div2">
                                                                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/640px-Twitter_Verified_Badge.svg.png' className='verified-badge' />
                                                            </div>
                                                        )}
                                                        <span className='thin-styling'> @{like?.User?.username} · {like?.updatedAt?.[1]} {like?.Tweet?.updatedAt?.[2]}</span></h5>
                                                </div>
                                            </div>

                                            {/* <div className='settings-btn' >
                                        <TweetSettingsModal tweet={tweet} />
                                    </div> */}
                                            <div className='tweet-tweet-box'>
                                                <p className='pointer' onClick={() => { history.push(`/${like?.User?.username}/tweets/${like?.id}`) }}>
                                                    {like?.tweet}
                                                </p>
                                            </div>

                                            <div className='tweet-img-gif'>
                                                {like?.image !== null && (
                                                    <img className='img-gif' src={like?.image} />
                                                )}
                                                {like?.gif !== null && (
                                                    <>
                                                        <img className='img-gif' src={like?.gif} />
                                                        <img className="padding-top " src={giphyTag} width='110px' />
                                                    </>
                                                )}
                                            </div>

                                            <div className='tweet-icons-box'>

                                                <div className='tweet-icon'>
                                                    <CreateCommentModal commentCount={like?.commentCount} tweet={like} newComment={newComment} />
                                                </div>
                                                <div className='tweet-icon'>
                                                    <Retweets retweetCount={like?.retweetCount} tweet={like} />
                                                </div>
                                                <div className='tweet-icon'>
                                                    <Likes likeCount={like?.likeCount} tweet={like} />
                                                </div>
                                                {/* <i onClick={handleLike(tweet)} className="fa-regular fa-heart"></i>{tweet?.likeCount} */}

                                            </div>
                                        </div>
                                    </div>

                                )
                            })
                        )}
                    </>

                )
            }
        </>
    )
}

export default UserLikes;
