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
    const [newComment, setNewComment] = useState(true)

    return (
        <>
            {tweets && (
                Object.values(tweets).map((tweet, index) => {
                    return (
                        <div className='tweet-container' key={index} >

                            <div className='tweet-profile-img' onClick={() => { history.push(`/${tweet?.User?.username}/${tweet?.User?.id}`) }}>

                                <img className='profile-img' src={tweet?.User?.profileImage} />


                            </div>

                            <div className='tweet-text-box'>

                                <div className='tweet-user-header'>
                                    <div className='username-name-box'>
                                        <h5 className='name-username' onClick={() => { history.push(`/${tweet?.User?.username}/${tweet?.User?.id}`) }}>
                                            {tweet?.User?.firstName}

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

                                <div className='tweet-img-gif'>
                                    {tweet?.image !== null && (
                                        <img className='img-gif' src={tweet?.image} />
                                    )}
                                    {tweet?.gif !== null && (
                                        <>
                                            <img className='img-gif' src={tweet?.gif} />
                                            <img className="padding-top " src={giphyTag} width='110px' />
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
