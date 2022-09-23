import { useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { createTweetBackend } from '../../store/tweet'

function CreateTweetForm({ setShowModal }) {
    const dispatch = useDispatch();
    const ref = useRef(null)
    const [tweet, setTweet] = useState("What's happening?");
    const [gif, setGif] = useState();
    const [image, setImage] = useState();

    const user = useSelector(state => state.session);

    console.log(user)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const tweetInput = {
            tweet,
            gif,
            image
        }
        await dispatch(createTweetBackend(tweetInput))
        setShowModal(false)
    }


    const submitButton = () => {
        return (
            <button type='submit'>Tweet</button>
        )
    }

    return (
        <div>
            <div className='profile-image-box'>
                {user?.user?.profileImage && (
                    <img className='profile-img' src={user.profileImage} />
                )}
                {!user?.profileImage && (
                    <img className='profile-img' src='https://secure.gravatar.com/avatar/c51f0fc9375c537923f6bf012b337f43?s=150&d=mm&r=g' />
                )}
                <form onSubmit={handleSubmit} className='form'>
                    <input
                        placeholder="What's happening?"
                        type='text'
                        value={tweet}
                        onChange={(e) => setTweet(e.target.value)}>
                    </input>

                    {/* emoji stuff */}
                    {/* <div className="pickerContainer" ref={ref} value={tweet} onChange={(e) => setTweet(e.target.value)}></div> */}


                    {submitButton()}
                </form>
            </div>
        </div>
    )
}

export default CreateTweetForm;
