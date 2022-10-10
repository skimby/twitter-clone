
import GetTweets from '../../GetTweets';

function ExploreTweets({ tweets }) {
    let allTweets = tweets?.exploreTweets


    return (
        <>
            <GetTweets tweets={Object.values(allTweets).sort((a, b) => {
                return new Date(b.createdAt1) - new Date(a.createdAt1)
            })} />
        </>
    )
}

export default ExploreTweets;
