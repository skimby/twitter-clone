import { useState, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getAllSearchedGifsBackend } from '../../store/gif';
import giphyTag from '../../images/powered-by-giphy.png'
import './GiphyModal.css';

function Giphy({ setShowModal, setGif }) {
    const dispatch = useDispatch();
    const ref = useRef();
    const [query, setQuery] = useState('');

    const gifs = useSelector(state => state.gifs)



    const handleSubmitGif = async (e) => {
        e.preventDefault()
        await dispatch(getAllSearchedGifsBackend(query))
    }

    const handleBack = () => {
        setShowModal(false)
    }

    return (
        <div className='giphy-modal-container'>
            <div className='gif-header'>
                <div className='back-button'>
                    <i className="fa-solid fa-arrow-left-long" onClick={handleBack}></i>
                </div>
                <div className='search-gif'>

                    <input className='search-styling' type='text' onChange={(e) => setQuery(e.target.value)}>
                    </input>
                    <img src={giphyTag} width='110px' alt='gif search and gifs provided by GIPHY' />


                    <div className='search-button'>
                        <button className='search-btn-icon' type='submit' onClick={handleSubmitGif}  >
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                    {/* </form> */}
                </div>
            </div>

            <div className='gif-display-grid'>
                {gifs && (
                    Object.values(gifs?.allGifs).map((gif, index) => {
                        return (
                            <div key={index} width='200px' height='200px' onClick={() => {
                                setGif(gif?.images?.original?.url
                                )
                                setShowModal(false)
                            }} ref={ref}>
                                <img src={gif?.images?.original?.url} width='200px' height='200px' alt='gif selection previews' />
                            </div>
                        )
                    })

                )}
            </div>

        </div>
    )
}

export default Giphy;
