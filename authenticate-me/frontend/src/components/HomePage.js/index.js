import CreateTweet from '../CreateTweet';
import './index.css'

function HomePage() {


    return (
        <>
            <div className='home-div'>
                <h2>Home</h2>
            </div>
            <div>
                <CreateTweet />
            </div>

        </>
    )
}

export default HomePage;
