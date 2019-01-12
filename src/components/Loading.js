import React from 'react'


const Loading = ({height, fontSize}) => {

  const stl = {
    height,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize
  };
  return (
      <div style={stl}>
        <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
      </div>
  );
};

export default Loading;
