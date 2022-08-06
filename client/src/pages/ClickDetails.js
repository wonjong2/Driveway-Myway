import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
// import Auth from '../utils/auth'
import { QUERY_SINGLE_DRIVEWAY } from '../utils/queries';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button, Row, Col } from 'react-bootstrap';
import GoogleMapReact from 'google-map-react';

function ClickDetails() {
    // const [render, setRender] = useState(true)
    const { id } = useParams();
    console.log(id);
    const navigate = useNavigate();

    const { loading, data, error } = useQuery(QUERY_SINGLE_DRIVEWAY, {
        variables: { _id: id },
    });

    if (loading) {
        return <div>Loading...</div>;
    } else {
        console.log("Searched Data!!!", data);
    }

    const MapMarker = ({ text }) => <div>{text}</div>;
    

const handleReserveBtn = async (event) => {
    event.preventDefault();
    console.log('Reserve Clicked!!!!');
    console.log('driveway id:', id);
    navigate(`/reservation/${id}`);
  };
    const defaultProps = {
        center: {
          lat: data.drivewayDetail.zipcode.lat,
          lng: data.drivewayDetail.zipcode.lng
        },
        zoom: 16
      };
    return (
        <div className="container" style={{ height: '60vh', width: '100%' }}>
            <h2>Driveway Details:</h2>
            <div className="card w-100">
            <div className="card-header">
            <Row className="float-right">
            <Button onClick={handleReserveBtn} type='button' variant='success' size='md'>
                Reserve
            </Button>
            </Row>
            <Row>
            <h3>{data.drivewayDetail.address}</h3>
            </Row>
            <Row>
            <h4>{data.drivewayDetail.zipcode.city}, {data.drivewayDetail.zipcode.state_id}</h4>
            </Row>
            <Row>
            <p className="float-left">Available on: {data.drivewayDetail.availableDate}</p>
            </Row>
            <Row>
            <p className="float-left">Price: ${data.drivewayDetail.price} / hour</p>
            </Row>
            </div>
            <div className="card-body">
            <Row >
                <Col>
                <Link to={`/driveway/${id}`}>
                    <img
                    alt={data.drivewayDetail.address}
                    src={`${data.drivewayDetail.image}`}
                    />
                </Link>
                </Col>
                <Col>
                <p>From: {data.drivewayDetail.startTime}</p>
                <p>To: {data.drivewayDetail.endTime}</p>
                <p>Description: {data.drivewayDetail.description}</p>
                <p>Rules: {data.drivewayDetail.rules}</p>
                </Col>
            </Row>
            </div>
        </div>
        <div style={{ height: '50vh', width: '100%' }}>
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