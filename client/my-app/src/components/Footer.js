import React from 'react'
import './FooterStyle.css'

const footer = () => {

    return (
        <div className='mt-5'>

            <footer>
                <p>
                    Created with <i className="fa fa-heart"></i> by	&nbsp;
          <a target="_blank" href="https://github.com/herlian-azis">Herlian Abdul Aziz</a>
          Contact me : azispro29@gmail.com

                </p>
            </footer>

            <div className="youtubeBtn">

                <a target="_blank" href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=azispro29@gmail.com">
                    <span>Send Email</span>
                    <i className="fab fa-youtube"></i>
                </a>

            </div>
        </div>
    )

}

export default footer