import React from 'react';
import './Footer.css'

function Footer() {
    const date = new Date();
    return (
        <div className='footer'>
            <p>© {date.getFullYear()} Airbnb clone! By Moctar Yonli - moctaryonli@gmail.com</p>
            <p>Privacy · Terms · Sitemap · Company Details</p>
        </div>
    )
}

export default Footer
