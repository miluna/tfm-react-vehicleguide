import React from 'react';
import Button from "../components/Button";
import Video from "../components/Video";
import {Link} from "react-router-dom";

const SimpleHome = () => {
    return (
        <div>
            <section id="home-video">
                <div className="video-box">
                    <div className="overlay">
                        <div className="text-overlay centered">
                            <h1 style={{color: "white", fontSize: "3.25rem"}} className="title"
                            >Find The Vehicle Of Your Dreams</h1>
                            <Link to={"/search"}><Button type="primary is-success" size="large" text="Search"/></Link>
                        </div>
                        <Video className="home-video" width={1280} height={720} source={null}/>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SimpleHome;
