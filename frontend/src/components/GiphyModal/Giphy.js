import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getAllSearchedGifsBackend } from '../../store/gif';
import { useHistory } from 'react-router-dom';
import './GiphyModal.css';

function Giphy() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [query, setQuery] = useState('');

    const gifs = useSelector(state => state.gifs)
    const allGifs = Object.values(gifs?.allGifs);



    const handleSubmit = async (e) => {
        e.preventDefault()

        await dispatch(getAllSearchedGifsBackend(query))
    }
    const handleBack = () => {
        history.goBack()
    }

    return (
        <div className='giphy-modal-container'>
            <div className='gif-header'>
                <div className='back-button'>
                    <i className="fa-solid fa-arrow-left-long" onClick={handleBack}></i>
                </div>
                <div className='search-gif'>
                    {/* <div className='search-div'> */}
                    <form onSubmit={handleSubmit} className='form'>
                        <input className='search-styling' type='text' onChange={(e) => setQuery(e.target.value)}>
                        </input>

                        <div className='search-button'>
                            <button className='search-btn-icon' type='submit' onSubmit={handleSubmit}><i className="fa-solid fa-magnifying-glass"></i></button>
                        </div>
                    </form>
                </div>
            </div>

            <div className='gif-display-grid'>
                {gifs && (
                    Object.values(gifs?.allGifs).map((gif, index) => {
                        return (
                            <div key={index} width='200px' height='200px' >
                                <img src={gif?.images?.original?.url} width='200px' height='200px' />
                            </div>
                        )
                    })

                )}
            </div>

        </div>
    )
}

export default Giphy;
