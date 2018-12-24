import React from "react";

const Footer = ({ author, year }) => {
    return (
        <div className="footer down footer-style" style={{backgroundColor: '#f5f5f5'}}>
            <div style={{textAlign: "center"}}>
                <p>Website created by {author}</p>
                <p>&copy; Copyright {year}</p>
            </div>
        </div>
    );
};

export default Footer;
