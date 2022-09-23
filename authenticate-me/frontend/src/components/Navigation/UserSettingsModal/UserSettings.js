import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { logout } from '../../../store/session'

function UserSettings() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)

    const handleLogout = () => {
        dispatch(logout())
    }


    return (
        <div className='settings-box'>
            <div className='user-info-container' >
                <div className='profile-img'>
                    <img className='profile-img' src={sessionUser?.user?.profileImage} />
                </div>

                <div className='user-info-content'>
                    <div>
                        <h5>{sessionUser?.user?.firstName}</h5>
                        <h5>  <span className='thin-styling'>@{sessionUser?.user?.username}</span></h5>
                    </div>
                </div>
            </div>
            <ul>
                <li onClick={handleLogout}>Log out @{sessionUser?.user?.username}</li>
            </ul>
        </div>
    )
}

export default UserSettings;
