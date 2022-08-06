import React from "react";
import auth from "../utils/auth";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { useParams } from "react-router-dom";
import {
  Elements,
  PaymentElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@apollo/client";
import { QUERY_CHECKOUT_INTENT, QUERY_SINGLE_DRIVEWAY } from "../utils/queries";

const stripe = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const Reservation = () => {
  const loggedIn = auth.loggedIn();
  const { data } = useQuery(QUERY_CHECKOUT_INTENT, {
    variables: {
      products: [],
    },
  });
  const clientSecret = data?.checkoutIntent?.clientSecret;
  const { id } = useParams();

  const handleSubmit = async (e, elements, stripe) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success/${id}`,
      },
    });
  };

  
  const {
    loading,
    data: drivewayData,
    error,
  } = useQuery(QUERY_SINGLE_DRIVEWAY, {
    variables: { _id: id },
  });
  const driveway = drivewayData?.drivewayDetail ?? {};

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
                src={`${driveway.image}`}
              />
              <div className="media-body">
                <p>{driveway.description ?? "Loading description"}</p>
              </div>
            </div>
            <h4>Price Details</h4>
            <table className="table table-borderless table-sm">
              <tbody>
                <tr>
                  <td>
                    {driveway
                      ? `${driveway.startTime} - ${driveway.endTime}`
                      : "Loading"}
                  </td>
                  <td className="text-right">${driveway.price}</td>
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
              <table className="table table-borderless table-sm">
                <tbody>
                  <tr>
                    <td>Total (USD)</td>
                    <td className="text-right">
                      ${driveway.price ? driveway.price + 2 : "0.00"}
                    </td>
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
              {clientSecret && (
                <Elements
                  options={{
                    clientSecret,
                  }}
                  stripe={stripe}
                >
                  <ElementsConsumer>
                    {({ elements, stripe: s }) => (
                      <form
                        id="payment-form"
                        className="w-auto"
                        onSubmit={(e) => handleSubmit(e, elements, s)}
                      >
                        <PaymentElement id="payment-element" />
                        <button
                            className="btn btn-primary mt-3 w-100"
                            type="submit"
                        >
                            Reserve
                        </button>
                      </form>
                    )}
                  </ElementsConsumer>
                </Elements>
              )}
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
