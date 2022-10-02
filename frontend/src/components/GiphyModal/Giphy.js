import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux"


function Giphy({ tweet, setTweet }) {

    useEffect(() => {
        setTweet(tweet) // + gif
    })

    return (
        <h1>Giphy</h1>
    )
}

export default Giphy;
