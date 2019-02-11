import React from 'react';


// const logo = (
//     <div className="logo" style={{ display: "flex", flexDirection: "row" }}>
//         <span/>
//     </div>
// );
// <img src="images/logo.png" alt="brandImage"/>

const Logo = (props) => {
    const { black } = props;

    const color = black ? 'black' : 'white';

    return (
            <h1 style={{color: color}} className="title">Vehicle<span style={{color: '#01d1b2'}}>Guide</span></h1>
    );
};

export default Logo;
