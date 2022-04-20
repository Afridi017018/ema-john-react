import React from 'react';
import logo from '../../images/Logo.svg'
import header from './Header.css'

const Header = () => {
    return (
        <div className='header'>
            <div className='imgg'><img src={logo} /></div>
            
            <nav>
                <a href="/shop">shop</a>
                <a href="/review">review</a>
                <a href="/manage">manage</a>
                </nav>
        </div>
    );
};

export default Header;