import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from 'react-router-dom';
import CreateCommentModal from '../../CreateCommentModal';
import Retweets from '../../Retweet';
import { getRetweetsBackend } from '../../../store/tweet';
import Likes from '../../Likes';
import giphyTag from '../../../images/powered-by-giphy.png'

function UserRetweets({ userId, isOwnPage }) {
    const dispatch = useDispatch();
    const history = useHistory();

    let likes = useSelector(state => state.likes)
    let retweets = useSelector(state => state.retweets)
    const tweets = useSelector(state => state.tweets)
    const [newComment] = useState(true)

    useEffect(() => {
        dispatch(getRetweetsBackend(userId, isOwnPage))
    }, [dispatch, userId, isOwnPage, retweets, likes])

    return (
        <>
            {tweets && (
                <>
                    {!isOwnPage && (
                        <>
                            {tweets?.retweets && (
                                Object.values(tweets?.retweets).map((retweet, index) => {
                                    return (
                                        <div className='tweet-container' key={index}>
                                            <div className='tweet-profile-img' onClick={() => { history.push(`/${retweet?.User?.username}/${retweet?.User?.id}`) }}>

                                                <img className='profile-img' src={retweet?.User?.profileImage} alt='user profile' />
                                            </div>

                                            <div className='tweet-text-box'>
                                                <div className='tweet-user-header'>
                                                    <div className='username-name-box'>
                                                        <h5 className='name-username' onClick={() => { history.push(`/${retweet?.User?.username}/${retweet?.User?.id}`) }}>
                                                            {retweet?.User?.firstName}

                                                            {retweet?.User?.verified && (
                                                                <div className="verified-div2">
                                                                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/640px-Twitter_Verified_Badge.svg.png' className='verified-badge' alt='verified badge' />
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
                                                        <img className='img-gif' src={retweet?.image} alt='tweet attachment' />
                                                    )}
                                                    {retweet?.gif !== null && (
                                                        <>
                                                            <img className='img-gif' src={retweet?.gif} alt='tweet attachment gif' />
                                                            <img className="padding-top " src={giphyTag} width='110px' alt='gif provided by GIPHY' />
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
                            {tweets?.loggedUserRetweets && (
                                Object.values(tweets?.loggedUserRetweets).map((retweet, index) => {
                                    return (
                                        <div className='tweet-container' key={index}>
                                            <div className='tweet-profile-img' onClick={() => { history.push(`/${retweet?.User?.username}/${retweet?.User?.id}`) }}>

                                                <img className='profile-img' src={retweet?.User?.profileImage} alt='user profile' />
                                            </div>

                                            <div className='tweet-text-box'>
                                                <div className='tweet-user-header'>
                                                    <div className='username-name-box'>
                                                        <h5 className='name-username' onClick={() => { history.push(`/${retweet?.User?.username}/${retweet?.User?.id}`) }}>
                                                            {retweet?.User?.firstName}


                                                            {retweet?.User?.verified && (
                                                                <div className="verified-div2">
                                                                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/640px-Twitter_Verified_Badge.svg.png' className='verified-badge' alt='verified badge' />
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
                                                        <img className='img-gif' src={retweet?.image} alt='tweet attachment' />
                                                    )}
                                                    {retweet?.gif !== null && (
                                                        <>
                                                            <img className='img-gif' src={retweet?.gif} alt='tweet attachment gif' />
                                                            <img className="padding-top " src={giphyTag} width='110px' alt='gif provided by GIPHY' />
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
