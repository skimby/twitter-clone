import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { createTweetBackend } from '../../store/tweet';
import { createPopup } from '@picmo/popup-picker';
import { createPicker } from 'picmo';
import { picker } from '../../index';
import { createRoot } from 'react-dom/client';





function CreateTweet() {
    const dispatch = useDispatch();
    const [tweet, setTweet] = useState("What's happening?");
    const [gif, setGif] = useState();
    const [image, setImage] = useState();

    const user = useSelector(state => state.session.user.user);


    // console.log(container)
    // console.log(root)
    const divPicker = <div class="pickerContainer"></div>
    const picker = createPicker({
        rootElement: divPicker
    });







    const handleSubmit = async (e) => {
        e.preventDefault();

        const tweetInput = {
            tweet,
            gif,
            image
        }
        dispatch(createTweetBackend(tweetInput))
    }


    const submitButton = () => {
        return (
            <button type='submit'>Tweet</button>
        )
    }

    return (
        <div>
            <div className='profile-image-box'>
                {user.profileImage && (
                    <img className='profile-img' src={user.profileImage} />
                )}
                {!user.profileImage && (
                    <img className='profile-img' src='https://secure.gravatar.com/avatar/c51f0fc9375c537923f6bf012b337f43?s=150&d=mm&r=g' />
                )}
                <form onSubmit={handleSubmit} className='form'>
                    <input
                        placeholder="What's happening?"
                        type='text'
                        value={tweet}
                        onChange={(e) => setTweet(e.target.value)}>
                    </input>






                    {submitButton()}
                </form>
            </div>
        </div>
    )
}

export default CreateTweet;
