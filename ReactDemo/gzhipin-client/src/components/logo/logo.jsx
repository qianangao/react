import React from "react";
import logo from './logo.svg'
import './logo.less'
export default function Logo() {
    return (
        <div className='logo-container'>
            <img src={logo} alt="" className='logo-image' alt='logo'/>
        </div>
    )
}
