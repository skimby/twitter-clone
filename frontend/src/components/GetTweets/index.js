import TweetSettingsModal from './TweetSettingsModal';
import { useHistory } from 'react-router-dom';
import Likes from '../Likes';
import Retweets from '../Retweet';
import CreateCommentModal from '../CreateCommentModal';
import './GetTweets.css'
import giphyTag from '../../images/powered-by-giphy.png'
import { useState } from 'react';


function GetTweets({ tweets }) {
    const history = useHistory();
    const [newComment] = useState(true)

    return (
        <>
            {tweets && (
                Object.values(tweets).map((tweet, index) => {
                    return (
                        <div className='tweet-container' key={index} >

                            <div className='tweet-profile-img' onClick={() => { history.push(`/${tweet?.User?.username}/${tweet?.User?.id}`) }}>

                                <img className='profile-img pointer' src={tweet?.User?.profileImage} alt='user profile' />


                            </div>

                            <div className='tweet-text-box'>

                                <div className='tweet-user-header'>
                                    <div className='username-name-box '>
                                        <h5 className='name-username pointer' onClick={() => { history.push(`/${tweet?.User?.username}/${tweet?.User?.id}`) }}>
                                            {tweet?.User?.firstName}
                                            {tweet?.User?.verified && (
                                                <div className="verified-div2">
                                                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/640px-Twitter_Verified_Badge.svg.png' className='verified-badge' alt='verified badge' />
                                                </div>
                                            )}
                                            <span className='thin-styling'> @{tweet?.User?.username} · {tweet?.updatedAt?.[1]} {tweet?.updatedAt?.[2]}</span></h5>
                                    </div>


                                    <div className='settings-btn' >
                                        <TweetSettingsModal tweet={tweet} />
                                    </div>



                                </div>

                                <div className='tweet-tweet-box'>
                                    <p className='pointer' onClick={() => { history.push(`/${tweet?.User?.username}/tweets/${tweet.id}`) }}>
                                        {tweet?.tweet}
                                    </p>
                                </div>

                                <div className='tweet-img-gif pointer' onClick={() => { history.push(`/${tweet?.User?.username}/tweets/${tweet.id}`) }}>
                                    {tweet?.image !== null && (
                                        <img className='img-gif' src={tweet?.image} alt='tweet attachment' />
                                    )}
                                    {tweet?.gif !== null && (
                                        <>
                                            <img className='img-gif' src={tweet?.gif} alt='tweet attachment gif' />
                                            <img className="padding-top " src={giphyTag} width='110px' alt='gif provided by GIPHY' />
                                        </>
                                    )}
                                </div>



                                <div className='tweet-icons-box'>

                                    <div className='tweet-icon'>
                                        <CreateCommentModal commentCount={tweet?.commentCount} tweet={tweet} newComment={newComment} />
                                    </div>
                                    <div className='tweet-icon'>
                                        <Retweets retweetCount={tweet?.retweetCount} tweet={tweet} />
                                    </div>
                                    <div className='tweet-icon'>
                                        <Likes likeCount={tweet?.likeCount} tweet={tweet} />
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

export default GetTweets;
