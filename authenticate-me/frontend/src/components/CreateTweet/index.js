import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"

function CreateTweet() {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user.user);



    return (
        <div>
            <div className='profile-image-box'>
                {user.profileImage && (
                    <img src={user.profileImage} />
                )}
                {!user.profileImage && (
                    <img src='https://secure.gravatar.com/avatar/c51f0fc9375c537923f6bf012b337f43?s=150&d=mm&r=g' />
                )}
            </div>
        </div>
    )
}

export default CreateTweet;
