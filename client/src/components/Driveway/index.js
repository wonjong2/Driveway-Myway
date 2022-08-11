import React from "react";
import { Link } from "react-router-dom";
//import { pluralize } from "../../utils/helpers"
import { useStoreContext } from "../../utils/GlobalState";

function Driveway({ reserved, onDelete, onUpdate, ...item }) {
  const [state, dispatch] = useStoreContext();
  //console.log(item)

  const { address, image, _id, price, zipcode } = item;

  return (
    <div className="col-sm-12 col-md-6 col-lg-3" style={{'font-family': 'Montserrat'}}>
      <div className="card-group px-1 py-1">
        <div className="card">
          <Link to={`/driveway/${_id}`}>
            <img
              className="card-img-top"
              alt={address}
              src={image === "default.jpg" ? `/images/${image}` : `${image}`}
            />
          </Link>
          <div className="card-body text-left">
            <h5 className="card-title">{address}</h5>
            <p className="card-text">Found in: {zipcode}</p>
            <p className="card-text">Price: ${price} / hour</p>
          </div>
          {!reserved && (
            <Link to={`/driveway/${_id}`}>
              <div className="card-footer">
                <small className="text-secondary">Click for More Details</small>
              </div>
            </Link>
          )}
          {onUpdate && (
            <div className="card-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onUpdate}
              >
                Update Listing
              </button>
            </div>
          )}
          {onDelete && (
            <div className="card-footer">
              <button
                type="button"
                className="btn btn-danger"
                onClick={onDelete}
              >
                Delete Listing
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Driveway;
