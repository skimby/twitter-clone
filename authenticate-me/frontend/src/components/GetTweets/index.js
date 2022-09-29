import TweetSettingsModal from './TweetSettingsModal';

import { useHistory } from 'react-router-dom';

import Likes from '../Likes';
import CreateCommentModal from '../CreateCommentModal';
import './GetTweets.css'


function GetTweets({ tweets }) {
    const history = useHistory();

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
                                <div>

                                    <h5 onClick={() => { history.push(`/${tweet?.User?.username}/${tweet?.User?.id}`) }}>
                                        {tweet?.User?.firstName}
                                    </h5>


                                    {/* <h5><span className='thin-styling'>@{tweet?.User?.username} • {tweet?.updatedAt[1]} {tweet?.updatedAt[2]}</span></h5> */}


                                    <p onClick={() => { history.push(`/${tweet?.User?.username}/tweets/${tweet.id}`) }}>
                                        {tweet?.tweet}
                                    </p>

                                </div>

                                <div className='tweet-img-gif'>
                                    <img className='img-gif' src={tweet?.image} width='200' />
                                    <img className='img-gif' src={tweet?.gif} width='200' />
                                </div>


                                <div className='settings-btn' >
                                    <TweetSettingsModal tweet={tweet} />
                                </div>

                                <div className='tweet-icons-box'>

                                    <CreateCommentModal commentCount={tweet?.commentCount} tweet={tweet} />

                                    <i className="fa-solid fa-retweet"></i>{tweet?.retweetCount}

                                    <Likes likeCount={tweet?.likeCount} tweet={tweet} />

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
