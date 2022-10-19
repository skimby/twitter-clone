import { useHistory } from "react-router-dom";
import CommentAddOns from "../CommentAddOns";
import '../GetTweets/GetTweets.css'

function CreateComment({ tweetId, setShowModalComment, tweet, currentComment, setShowModalSettings, edit, newComment }) {
    const history = useHistory();

    const linkToUserPage = () => {
        history.push(`/${tweet?.User?.username}/${tweet?.User?.id}`)
        setShowModalComment(false)
    }


    return (
        <div>
            <div className="replying-to-comment">
                <div className="x-box" onClick={() => setShowModalComment(false)}>
                    <i className="fa-solid fa-x"></i>
                </div>
            </div>


            <div className='tweet-container2'>
                <div className='tweet-profile-img' onClick={() => { history.push(`/${tweet?.User?.username}/${tweet?.User?.id}`) }}>

                    <img className='profile-img' src={tweet?.User?.profileImage} />

                    <div className="vl"></div>
                </div>


                <div className='tweet-user-header'>
                    <div className='username-name-box'>
                        <h5 className='name-username' onClick={() => { history.push(`/${tweet?.User?.username}/${tweet?.User?.id}`) }}>
                            {tweet?.User?.firstName}

                            {tweet?.User?.verified && (
                                <div className="verified-div">
                                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/640px-Twitter_Verified_Badge.svg.png' className='verified-badge' />
                                </div>
                            )}

                            <span className='thin-styling'> @{tweet?.User?.username} · {tweet?.updatedAt[1]} {tweet?.updatedAt[2]}</span></h5>
                    </div>

                    <div className='tweet-tweet-box'>
                        <p onClick={() => { history.push(`/${tweet?.User?.username}/tweets/${tweet.id}`) }}>
                            {tweet?.tweet}
                        </p>
                        <p className="gray-p">replying to <span className="blue-text pointer" onClick={linkToUserPage}>@{tweet?.User?.username}</span></p>
                    </div>
                </div>


            </div>
            <div>
                <CommentAddOns tweetId={tweetId} setShowModalComment={setShowModalComment} currentComment={currentComment} tweet={tweet} setShowModalSettings={setShowModalSettings} edit={edit} newComment={newComment} />
            </div>


        </div>
    )
}

export default CreateComment;
