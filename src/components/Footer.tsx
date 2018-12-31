import React, {CSSProperties, FunctionComponent} from "react";

const footerStyle: CSSProperties = {
    position: 'fixed',
    bottom: '0',
    backgroundColor: '#f5f5f5',
    width: '100vw'
};

type FooterProps = {
    author: string,
    year: string
}


const Footer : FunctionComponent<FooterProps> = ({author, year}) => {

    return (
        <div style={footerStyle}>
            <div style={{textAlign: "center"}}>
                <p>Website created by {author}</p>
                <p>&copy; Copyright {year}</p>
            </div>
        </div>
    );
};

export default Footer;
