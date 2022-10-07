import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import coverImg from '../../images/cover-image.jpeg';
import logo from '../../images/twitter-logo.png';

import './SignupPage.css';


function SignupPage() {

    return (
        <>
            <div className="signup-page-container">
                <div className="cover-img-container">
                    <img src={coverImg} className="cover-img" />
                </div>

                <div className="cover-text-box">
                    <img src={logo} className='logo-box-signup' />
                    <h1 className="big-header">Happening now</h1>
                    <h2 className='medium-header'>Join Twitter today.</h2>
                    <div className='login-buttons'>
                        <LoginFormModal />
                        <SignupFormModal />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignupPage;
