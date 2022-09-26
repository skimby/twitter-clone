import { useHistory } from 'react-router-dom';
import GetComment from '../GetComment';

function GetOneTweet({ tweet }) {

    const user = tweet?.User;
    const history = useHistory();

    console.log(tweet?.id)

    const handleBack = () => {
        history.push('/')
    }
    return (
        <>
            <div id="middle-container">

                <div>
                    <div>
                        <i className="fa-solid fa-arrow-left-long" onClick={handleBack}></i>
                    </div>
                    <div>
                        <h5>Tweet</h5>
                    </div>
                </div>

                <div className='user-info-container'>
                    <div className='profile-img'>
                        <img className='profile-img' src={user?.profileImage} />
                    </div>

                    <div className='user-info-content'>
                        <div>
                            <h5>{user?.firstName}</h5>
                            <h5>  <span className='thin-styling'>@{user?.username}</span></h5>
                        </div>
                    </div>
                </div>
                {/* <div className='cover-image-container'>
                    <img className='cover-img' src={user?.coverImage} />
                </div>

                <div>
                    <img className='user-profile-img-big' src={user?.profileImage} />
                </div> */}

                <div>
                    <h3>{tweet?.tweet}</h3>
                    <img src={tweet?.image} />
                    <img src={tweet?.gif} width='200' />


                    <p>{tweet?.updatedAt?.[1]} {tweet?.updatedAt?.[2]}, {tweet?.updatedAt?.[3]}</p>


                    <p>{tweet?.retweetCount} Retweets</p>
                    <p>{tweet?.commentCount} Quote Tweets</p>
                    <p>{tweet?.likeCount} Likes</p>

                    <i className="fa-regular fa-comment"></i>
                    <i className="fa-solid fa-retweet"></i>
                    <i className="fa-regular fa-heart"></i>


                    {tweet?.Comments && (
                        tweet?.Comments.map((comment, index) => {
                            return (
                                <div key={index}>
                                    <GetComment comment={comment} />
                                </div>
                            )
                        })
                    )}
                </div>
            </div>
        </>
    )
}

export default GetOneTweet;
