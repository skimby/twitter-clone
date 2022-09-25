import { useHistory } from 'react-router-dom';

function GetOneTweet({ tweet }) {

    const user = tweet?.User;
    const history = useHistory();


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
                    <img src={tweet?.gif} />
                    <p>{user?.bio}</p>
                    <i className="fa-solid fa-link"></i>
                    <p>{user?.website}</p>
                    <i className="fa-regular fa-calendar-days"></i>


                    {tweet?.updatedAt && (
                        <p>Joined {tweet?.updatedAt[1]} {tweet?.updatedAt[2]}</p>
                    )}


                    <p>{user?.followingCount} Following</p>
                    <p>{user?.followerCount} Followers</p>
                </div>

            </div>
        </>
    )
}

export default GetOneTweet;
