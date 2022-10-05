import '../CreateCommentInline/CreateCom'
import '.TweetAddOns'


function TweetAddOns() {


    return (

        <div className="comment-icons-gif-img">
            <label className="upload-btn" htmlFor='inputTag'>
                <i className="fa-regular fa-image blue-icon"></i>
                <input id='inputTag' type="file" onChange={updateFile} />
            </label>

            <div className='emoji-container3' id='inline' ref={refContainer} ></div>

            <div ref={refButton} className='inline' id='emoji-button3' onClick={handleOpenEmoji4}>
                <i className="fa-regular fa-face-smile blue-icon"></i>
            </div>

            <div className="inline">
                <GiphyModal setGif={setGif} />
            </div>

            <button type='submit' className="btn-float-right">Reply</button>

        </div>
    )
}

export default TweetAddOns;
