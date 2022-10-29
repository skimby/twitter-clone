import { allUsersBackend } from "../../store/user";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from "react-router-dom";
import './Search.css'

const Search = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const users = useSelector(state => state.users);

    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState("");

    useEffect(() => {
        dispatch(allUsersBackend());
    }, [dispatch])

    const userResults = Object.values(users?.AllUsers)?.filter((user) => {
        return user?.username?.toLowerCase().includes(search?.toLowerCase());
    });

    const clickEvent = (() => {
        setSearch('')
        setSearchResults('')
        history.push(`/${users?.user?.username}/${users?.user?.id}`)
    })


    const returnResults = userResults?.slice(0, 5)?.map((user) => {
        return (
            <>
                <Link
                    to={`/${user?.username}/${user?.id}`}
                    key={user?.id}
                    onClick={clickEvent}
                    className="search-result-link"
                >
                    <div className="search-profile-div">
                        <img
                            src={user?.profileImage}
                            className="profile-img-search pointer"
                            alt='user profile preview'
                        />
                        <div className="search-user-info">
                            <h5 className='name-username pointer'>{user?.username}</h5>
                            {user?.verified && (
                                <div className="verified-div2">
                                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/640px-Twitter_Verified_Badge.svg.png' className='verified-badge' alt='verified badge icon' />
                                </div>
                            )}
                            <p className='p-gray-small'>@{user?.username}</p>
                            {user?.bio && (
                                <p className='p-gray-small'>{user?.bio.slice(0, 33)}...</p>
                            )}

                        </div>
                    </div>
                </Link>
            </>
        );
    });

    return (
        <>
            <form>
                <div className="search-user-styling">
                    <div className="mag-glass">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <input
                        type='text'
                        className="hidden-input"
                        value={search}
                        placeholder='Search User'
                        onChange={(e) => setSearch(e.target.value)}
                        onClick={() => setSearchResults("results-active")}
                    // onBlur={() => setSearchResults("")}
                    />
                </div>
            </form>

            <div className={`search-popup ${searchResults}`}>
                {returnResults}
            </div>
        </>
    )
}
export default Search;
