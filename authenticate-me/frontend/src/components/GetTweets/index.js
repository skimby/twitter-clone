import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getFeedTweetsBackend, deleteTweetBackend } from '../../store/tweet';
import { editTweetBackend } from '../../store/tweet';
import TweetSettingsModal from './TweetSettingsModal';
import EditFormModal from './EditTweetModal';
import DeleteTweetModal from './DeleteTweetModal';
import './GetTweets.css'


function GetTweets() {
    const dispatch = useDispatch();
    const [showSettings, setShowSettings] = useState(false);
    const [isUserTweet, setIsUserTweet] = useState();
    const tweets = useSelector(state => state.tweets)


    useEffect(() => {
        dispatch(getFeedTweetsBackend())
    }, [dispatch])


    return (
        <>
            {tweets?.feedTweets && (
                Object.values(tweets?.feedTweets).map((tweet, index) => {
                    return (
                        <div className='tweet-container' key={index}>
                            <div className='profile-img'>
                                <img className='profile-img' src={tweet?.User?.profileImage} />
                            </div>

                            <div className='tweet-text-box'>
                                <div>
                                    <h5>{tweet?.User?.firstName}  <span className='thin-styling'>@{tweet?.User?.username}</span></h5>
                                </div>

                                <div>
                                    <p>{tweet?.tweet}</p>
                                </div>


                                <div className='settings-btn' >
                                    <TweetSettingsModal tweet={tweet} />
                                </div>

                            </div>
                            <div className='tweet-icons-box'>
                                <div>
                                    <i className="fa-regular fa-comment"></i>{tweet?.commentCount}
                                </div>
                                <div>
                                    <i className="fa-solid fa-retweet"></i>{tweet?.retweetCount}
                                </div>
                                <div>
                                    <i className="fa-regular fa-heart"></i>{tweet?.commentCount}
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
