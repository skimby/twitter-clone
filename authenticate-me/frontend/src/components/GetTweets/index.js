import TweetSettingsModal from './TweetSettingsModal';

import './GetTweets.css'


function GetTweets({ tweets }) {

    return (
        <>
            {tweets && (
                Object.values(tweets).map((tweet, index) => {
                    return (
                        <div className='tweet-container' key={index}>
                            <div className='profile-img'>
                                <img className='profile-img' src={tweet?.User?.profileImage} />
                            </div>

                            <div className='tweet-text-box'>
                                <div>
                                    <h5>{tweet?.User?.firstName}  <span className='thin-styling'>@{tweet?.username}</span></h5>
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
