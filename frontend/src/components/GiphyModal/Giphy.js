import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getAllSearchedGifsBackend } from '../../store/gif';


function Giphy() {
    const dispatch = useDispatch();
    const [query, setQuery] = useState('');

    const gifs = useSelector(state => state.gifs)
    const allGifs = Object.values(gifs?.allGifs);

    console.log(allGifs[0])

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('test')
        await dispatch(getAllSearchedGifsBackend(query))
    }


    return (
        <div>
            <h1>Giphy</h1>
            <div className='search-gif'>
                <form onSubmit={handleSubmit} className='form'>

                    <input type='text' onChange={(e) => setQuery(e.target.value)}>
                    </input>
                    <button type='submit'>Search</button>
                </form>
            </div>
            <div>


                {allGifs[0] && (
                    <img src={allGifs[0]?.images?.original?.url} />
                )}
            </div>
            {/* <div>
                {gifs && (
                    Object.values(gifs?.allGifs).map((gif, index) => {
                        return (
                            <div key={index}>
                                <img src={gif.url} />
                            </div>
                        )
                    })

                )}
            </div> */}

        </div>
    )
}

export default Giphy;
