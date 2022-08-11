import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import { QUERY_SINGLE_DRIVEWAY } from '../utils/queries';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button, Row, Col } from 'react-bootstrap';
import GoogleMapReact from 'google-map-react';
import {FcBookmark} from 'react-icons/fc'


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
    console.log("Searched Detail Data!!!", data);
    console.log("driveway id", data.drivewayDetail._id)
  }

  const Marker = ({ text }) => <div><h2 className="icon-red"><FcBookmark/></h2></div>;

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
    <div className="container" style={{ height: '40vh', width: '100%' }}>
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
          <Row className="justify-content-center">
            <h4>{data.drivewayDetail.zipcode.city}, {data.drivewayDetail.zipcode.state_id}</h4>
          </Row>
          <Row className="justify-content-center">
            <p className="float-left">Available on: {data.drivewayDetail.availableDate}</p>
          </Row>
          <Row className="justify-content-center">
            <p className="float-left">Price: ${data.drivewayDetail.price} / hour</p>
          </Row>
        </div>
        <div className="card-body">
          <Row >
            <Col>
              <Link to={`/driveway/${id}`}>
                <img
                  alt={data.drivewayDetail.address}
                  // src={`${data.drivewayDetail.image}`}
                  src={data.drivewayDetail.image === 'default.jpg' ? `/images/${data.drivewayDetail.image}` : `${data.drivewayDetail.image}`}
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
      <div style={{ height: '40vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <Marker
          lat={data.drivewayDetail.zipcode.lat}
          lng={data.drivewayDetail.zipcode.lng}
        />
        </GoogleMapReact>
      </div>
      <div className="my-5">
        <CommentList
        comments={data.drivewayDetail.comments} />
      </div>
      <div className="my-5">
        <CommentForm drivewayId={data.drivewayDetail._id} />
      </div>
    </div>
  );
}

export default ClickDetails;