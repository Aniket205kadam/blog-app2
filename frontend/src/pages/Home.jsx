import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/all-posts');
    }

    return (
        <div className="static-page">
            <div className="images-section">
                <img
                    src="https://images.pexels.com/photos/7775639/pexels-photo-7775639.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                    alt="javascript developer image"
                    className="static-image"
                />
                <img
                    src="https://images.pexels.com/photos/3912992/pexels-photo-3912992.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Robots Enginner image"
                    className="static-image"
                />
                <img
                    src="https://images.pexels.com/photos/41162/moon-landing-apollo-11-nasa-buzz-aldrin-41162.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="astronaut images"
                    className="static-image"
                />
            </div>

            <div className="button-container">
                <button className="navigate-button" onClick={handleButtonClick}>
                    View All Posts
                </button>
            </div>
        </div>
    )
}

export default Home;