import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import moment from "moment";
import PostDriveway from "./PostDriveway";
import { UPDATE_DRIVEWAY } from "../utils/mutations";
import { QUERY_SINGLE_DRIVEWAY } from "../utils/queries";

const EditDriveway = () => {
  const { id } = useParams();
  const [updateDriveway] = useMutation(UPDATE_DRIVEWAY);
  const { data: drivewayData } = useQuery(QUERY_SINGLE_DRIVEWAY, {
    variables: { _id: id },
  });
  const driveway = drivewayData?.drivewayDetail;
  return driveway ? (
    <PostDriveway
      driveway={{
        ...driveway,
        availableDate: moment(driveway.availableDate).format("YYYY-MM-DD"),
        zipcode: driveway.zipcode.zip,
        startTime: moment(driveway.startTime, "h:mm A").format("HH:mm"),
        endTime: moment(driveway.endTime, "h:mm A").format("HH:mm"),
      }}
    />
  ) : (
    <h1>Loading...</h1>
  );
};

export default EditDriveway;
