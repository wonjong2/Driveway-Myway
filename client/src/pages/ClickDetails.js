import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
// import Auth from '../utils/auth'
import { QUERY_SINGLE_DRIVEWAY } from '../utils/queries';
import GoogleMapReact from 'google-map-react';

const MapMarker = ({ text }) => <div>{text}</div>;

function ClickDetails() {
    // const [render, setRender] = useState(true)
    const { id } = useParams();
    console.log(id);

    const { loading, data, error } = useQuery(QUERY_SINGLE_DRIVEWAY, {
        variables: { _id: id },
    });

    if (loading) {
        return <div>Loading...</div>;
    } else {
        console.log("Searched Data!!!", data);
    }
    const defaultProps = {
        center: {
          lat: data.drivewayDetail.zipcode.lat,
          lng: data.drivewayDetail.zipcode.lng
        },
        zoom: 11
      };
    return (
        <div className="container" style={{ height: '60vh', width: '100%' }}>
            <h2>Driveway Details:</h2>
            <div className="card w-100">
            <div className="card-header">
            <h3>{data.drivewayDetail.address}</h3>
            <p>Abailable on {data.drivewayDetail.availableDate}</p>
            <p>${data.drivewayDetail.price} / hour</p>
            </div>
            <div className="card-body">
                <Link to={`/driveway/${id}`}>
                    <img
                    alt={data.drivewayDetail.address}
                    src={`/images/${data.drivewayDetail.image}`}
                    />
                </Link>
            </div>
        </div>
        <div style={{ height: '40vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCOrlRJ5GESPc0xJ_M4jed6dmOgwUSeHRM" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <MapMarker
          lat={data.drivewayDetail.zipcode.lat}
          lng={data.drivewayDetail.zipcode.lng}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
        </div>
    );
}

export default ClickDetails;