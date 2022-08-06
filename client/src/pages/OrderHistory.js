import React from "react";
import { Link } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_MY_DRIVEWAYS } from "../utils/queries";
import Driveway from "../components/Driveway";

function OrderHistory() {
  const { data: drivewayData, error } = useQuery(QUERY_MY_DRIVEWAYS);
  const driveways = drivewayData?.mydriveways;

  console.log(driveways)

  return (
    <>
      <div className="container my-1">
        <Link to="/">← Back to Driveways</Link>

        {driveways ? (
          <>
            <h2>Order History</h2>
            {driveways.map((driveway) => (
              <div key={driveway._id} className="my-2">
                <Driveway
                  key={driveway._id}
                  _id={driveway._id}
                  image={driveway.image}
                  name={driveway.name}
                  price={driveway.price}
                  quantity={driveway.quantity}
                  reserved
                />
              </div>
            ))}
          </>
        ) : null}
      </div>
    </>
  );
}

export default OrderHistory;
