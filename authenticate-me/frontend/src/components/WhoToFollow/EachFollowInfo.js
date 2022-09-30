

function EachFollowInfo() {
    return (
        <>
            <div className='tweet-profile-img' onClick={() => {
                history.push(`/${follow?.Follower?.username}/${follow?.userId}`)
            }}>
                <img className='profile-img' src={follow?.Follower?.profileImage} />
            </div>
            <div>

                <h5>{follow?.Follower?.firstName}  </h5>
                <h5>@{follow?.Follower?.username}</h5>
                <p>{follow?.Follower?.bio}</p>


                {alreadyFollowing && (
                    <FollowingButton loggedUserId={loggedUser?.id} userId={follow?.Follower.id} isOwnPage={isOwnPage} />
                )}

                {!alreadyFollowing && (
                    <FollowButton loggedUserId={loggedUser?.id} userId={follow?.userId} isOwnPage={isOwnPage} />
                )}
            </div>
        </>
    )
}

export default EachFollowInfo;
