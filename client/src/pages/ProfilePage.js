import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER, QUERY_CREATED_DRIVEWAYS } from "../utils/queries";
import { DELETE_DRIVEWAY } from "../utils/mutations";
import Driveway from "../components/Driveway";

const ProfilePage = () => {
  const { data: userData } = useQuery(QUERY_USER);
  const { data: drivewaysData, refetch } = useQuery(QUERY_CREATED_DRIVEWAYS);
  const [deleteDriveway] = useMutation(DELETE_DRIVEWAY);
  const user = userData?.user;
  const driveways = drivewaysData?.createddriveways ?? [];

  if (!user) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="container mt-3">
      <h1>Hello, {user.firstName}</h1>
      <h3>Your listings:</h3>
      <div className="row">
        {driveways.map((driveway) => (
          <Driveway
            _id={driveway._id}
            key={driveway._id}
            image={driveway.image}
            name={driveway.name}
            price={driveway.price}
            quantity={driveway.quantity}
            reserved
            onDelete={async () => {
              await deleteDriveway({
                variables: {
                  id: driveway._id,
                },
              });
              refetch();
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
