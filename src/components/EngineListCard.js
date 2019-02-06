import React from 'react';

const EngineListCard = (props) => {

    const { engines } = props;

    const headers =
    <tr>
        <th>Cylinders</th>
        <th>Displacement</th>
        <th>Horsepower</th>
        <th>Type</th>
        <th>Turbocharged</th>
        <th>Autonomy</th>
        <th>Pollution</th>
        <th>Energy Certificate</th>
    </tr>;

    const content = engines.map(e => {
       return (
           <tr>
               <td>{e.cylinders}</td>
               <td>{e.displacement}cc</td>
               <td>{e.horsepower}hp</td>
               <td>{e.type}</td>
               <td>{e.hasTurbo ? "Yes" : "No"}</td>
               <td>{e.autonomy}km</td>
               <td>{e.pollution}</td>
               <td>{e.energyCertificate}</td>
           </tr>
       );
    });

    return (
        <div className="product-container">
            <div className="card-content">
                <h1 className="title">
                    Available Engines
                </h1>
                <table className="table centered">
                    {headers}
                    {content}
                </table>
            </div>
        </div>
    );
};

export default EngineListCard;
