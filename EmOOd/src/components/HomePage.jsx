import React from 'react'

import { Link } from 'react-router-dom'

const HomePage = () => {
    return (
        <div >
            <div className="px-4 py-5 my-5 text-center">
                <h1 className="display-5 fw-bold text-body-emphasis">About this website</h1>
                <div className="col-lg-6 mx-auto">
                    <p className="lead mb-4">Here you can record your Moods, Emotions time to time and have a history of all the moods. It may help you in analyzing yourself.
                        Sometimes we face difficulty in identifying and expressing what we feel (this is called <b>Alexithymia</b>), this platform will give you options so that you can relate.
                        <br></br>
                        <br></br>
                        In future I'll add more features and enhance this website for better purpose :)
                    </p>
                </div>
            </div>
        </div>
    )
}

export default HomePage
