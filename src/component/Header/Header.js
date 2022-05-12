import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/Logo.svg'
import header from './Header.css'

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className='header'>
            <div className='imgg'><img src={logo} /></div>
            
            <nav>
                <Link to="/shop">shop</Link>
                <Link to="/review">review</Link>
                <Link to="/manage">manage</Link>
                <button onClick={()=> setLoggedInUser({})}>sign out</button>
                <small>{loggedInUser.name}</small>
                
                </nav>
        </div>
    );
};

export default Header;