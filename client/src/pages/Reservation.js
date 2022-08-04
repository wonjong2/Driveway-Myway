import React from "react";
import auth from "../utils/auth";
import Login from "../components/Login";
import Signup from "../components/Signup";
//import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@apollo/client";
import { QUERY_CHECKOUT_INTENT } from "../utils/queries";

const stripe = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const Reservation = () => {
  const loggedIn = auth.loggedIn();
  const { data } = useQuery(QUERY_CHECKOUT_INTENT, {
    variables: {
      products: [],
    },
  });
  const clientSecret = data?.checkoutIntent?.clientSecret;
  return (
    <div className="container">
      <h1>Confirm Reservation and Pay</h1>
      <div className="row flex-row-reverse">
        <div className="col-md-6 my-4">
          <div className="border rounded p-3">
            <div className="media border-bottom pb-4 mb-3 align-items-center">
              <img
                height={106}
                width={124}
                className="rounded mr-3"
                src="https://nypost.com/wp-content/uploads/sites/2/2020/02/parking-spot-san-fran-one-million.jpg?quality=75&strip=all&w=744"
              />
              <div className="media-body">
                <p>A perfect spot for taking a date and leaving in this spot</p>
              </div>
            </div>
            <h4>Price Details</h4>
            <table class="table table-borderless table-sm">
              <tbody>
                <tr>
                  <td>$5 x 3 hours</td>
                  <td className="text-right">$15.00</td>
                </tr>
                <tr>
                  <td>Service fee</td>
                  <td className="text-right">$0.50</td>
                </tr>
                <tr>
                  <td>Occupancy taxes and fees</td>
                  <td className="text-right">$1.50</td>
                </tr>
              </tbody>
            </table>
            <div className="border-top pt-3 font-weight-bolder">
              <table class="table table-borderless table-sm">
                <tbody>
                  <tr>
                    <td>Total (USD)</td>
                    <td className="text-right">$17.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          {loggedIn && (
            <>
              <h3>Hi, you're logged in</h3>
              {/* {clientSecret && (
                <Elements
                  options={{
                    clientSecret,
                  }}
                  stripe={stripe}
                >
                  <form
                    id="payment-form"
                    onSubmit={() => {}}
                    style={{ width: "auto" }}
                  >
                    <PaymentElement id="payment-element" />
                  </form>
                </Elements>
              )} */}
            </>
          )}
          {!loggedIn && (
            <>
              <Login />
              <Signup />
            </>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default Reservation;
