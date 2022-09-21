import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux"
import CreateTweet from '../CreateTweet';
import GetTweets from '../GetTweets';

import './HomePage.css'

function HomePage() {
    const dispatch = useDispatch();


    return (
        <>
            <div className='home-div'>
                <h2>Home</h2>
            </div>

            <div>
                <CreateTweet />
            </div>

            <div>
                <GetTweets />
            </div>



        </>
    )
}

export default HomePage;
