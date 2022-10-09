import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory, Link, useParams } from 'react-router-dom';
import CreateCommentModal from '../../CreateCommentModal';
import Retweets from '../../Retweet';
import { getUserRetweetsBackend } from '../../../store/retweet';
import Likes from '../../Likes';
import giphyTag from '../../../images/powered-by-giphy.png'

function UserRetweets({ userId, isOwnPage }) {
    const dispatch = useDispatch();
    const history = useHistory();

    let retweets = useSelector(state => state.retweets)

    const [newComment, setNewComment] = useState(true)

    console.log(retweets?.loggedUserRetweets)
    useEffect(() => {
        dispatch(getUserRetweetsBackend(userId, isOwnPage))
    }, [dispatch, userId])

    return (
        <>
            {retweets && (
                <>
                    {!isOwnPage && (
                        <>
                            {retweets?.userRetweets && (
                                Object.values(retweets?.userRetweets).map((retweet, index) => {
                                    return (
                                        <div className='tweet-container' key={index}>
                                            <div className='tweet-profile-img' onClick={() => { history.push(`/${retweet?.User?.username}/${retweet?.User?.id}`) }}>

                                                <img className='profile-img' src={retweet?.User?.profileImage} />
                                            </div>

                                            <div className='tweet-text-box'>
                                                <div className='tweet-user-header'>
                                                    <div className='username-name-box'>
                                                        <h5 className='name-username' onClick={() => { history.push(`/${retweet?.User?.username}/${retweet?.User?.id}`) }}>
                                                            {retweet?.User?.firstName}

                                                            {retweet?.User?.verified && (
                                                                <div className="verified-div2">
                                                                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/640px-Twitter_Verified_Badge.svg.png' className='verified-badge' />
                                                                </div>
                                                            )}
                                                            <span className='thin-styling'> @{retweet?.User?.username} · {retweet?.updatedAt?.[1]} {retweet?.updatedAt?.[2]}</span></h5>
                                                    </div>
                                                </div>

                                                {/* <div className='settings-btn' >
                                        <TweetSettingsModal tweet={tweet} />
                                    </div> */}
                                                <div className='tweet-tweet-box'>
                                                    <p className='pointer' onClick={() => { history.push(`/${retweet?.User?.username}/tweets/${retweet?.id}`) }}>
                                                        {retweet?.tweet}
                                                    </p>
                                                </div>

                                                <div className='tweet-img-gif'>
                                                    {retweet?.image !== null && (
                                                        <img className='img-gif' src={retweet?.image} />
                                                    )}
                                                    {retweet?.gif !== null && (
                                                        <>
                                                            <img className='img-gif' src={retweet?.gif} />
                                                            <img className="padding-top " src={giphyTag} width='110px' />
                                                        </>
                                                    )}
                                                </div>

                                                <div className='tweet-icons-box'>

                                                    <div className='tweet-icon'>
                                                        <CreateCommentModal commentCount={retweet?.commentCount} tweet={retweet} newComment={newComment} />
                                                    </div>
                                                    <div className='tweet-icon'>
                                                        <Retweets retweetCount={retweet?.retweetCount} tweet={retweet} />
                                                    </div>

                                                    <div className='tweet-icon'>
                                                        <Likes likeCount={retweet?.likeCount} tweet={retweet} />
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

                    {isOwnPage && (
                        <>
                            {retweets?.loggedUserRetweets && (
                                Object.values(retweets?.loggedUserRetweets).map((retweet, index) => {
                                    return (
                                        <div className='tweet-container' key={index}>
                                            <div className='tweet-profile-img' onClick={() => { history.push(`/${retweet?.User?.username}/${retweet?.User?.id}`) }}>

                                                <img className='profile-img' src={retweet?.User?.profileImage} />
                                            </div>

                                            <div className='tweet-text-box'>
                                                <div className='tweet-user-header'>
                                                    <div className='username-name-box'>
                                                        <h5 className='name-username' onClick={() => { history.push(`/${retweet?.User?.username}/${retweet?.User?.id}`) }}>
                                                            {retweet?.User?.firstName}


                                                            {retweet?.User?.verified && (
                                                                <div className="verified-div2">
                                                                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/640px-Twitter_Verified_Badge.svg.png' className='verified-badge' />
                                                                </div>
                                                            )}

                                                            <span className='thin-styling'> @{retweet?.User?.username} · {retweet?.updatedAt?.[1]} {retweet?.updatedAt?.[2]}</span></h5>
                                                    </div>
                                                </div>

                                                {/* <div className='settings-btn' >
                                        <TweetSettingsModal tweet={tweet} />
                                    </div> */}
                                                <div className='tweet-tweet-box'>
                                                    <p className='pointer' onClick={() => { history.push(`/${retweet?.User?.username}/tweets/${retweet?.id}`) }}>
                                                        {retweet?.tweet}
                                                    </p>
                                                </div>

                                                <div className='tweet-img-gif'>
                                                    {retweet?.image !== null && (
                                                        <img className='img-gif' src={retweet?.image} />
                                                    )}
                                                    {retweet?.gif !== null && (
                                                        <>
                                                            <img className='img-gif' src={retweet?.gif} />
                                                            <img className="padding-top " src={giphyTag} width='110px' />
                                                        </>
                                                    )}
                                                </div>

                                                <div className='tweet-icons-box'>

                                                    <div className='tweet-icon'>
                                                        <CreateCommentModal commentCount={retweet?.commentCount} tweet={retweet} newComment={newComment} />
                                                    </div>
                                                    <div className='tweet-icon'>
                                                        <Retweets retweetCount={retweet?.retweetCount} tweet={retweet} />
                                                    </div>

                                                    <div className='tweet-icon'>
                                                        <Likes likeCount={retweet?.likeCount} tweet={retweet} />
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
                </>
            )}
        </>
    )
}

export default UserRetweets;
