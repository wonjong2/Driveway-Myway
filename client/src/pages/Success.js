import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Jumbotron from '../components/Jumbotron';
import { ADD_RESERVATION } from '../utils/mutations';
import { useParams } from "react-router-dom";

function Success() {
  const { id } = useParams();

  const [addReservation] = useMutation(ADD_RESERVATION);

  useEffect(()=> {
    addReservation({
      variables: {
        driveway: id
      }
    })
    setTimeout(() => {
      window.location.assign('/');
    }, 3000);
  }, [])

      

  
  return (
    <div>
      <Jumbotron>
        <h1>Success!</h1>
        <h2>Thank you for your purchase!</h2>
        <h2>You will now be redirected to the home page</h2>
      </Jumbotron>
    </div>
  );
}

export default Success;
