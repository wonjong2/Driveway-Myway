import React from "react";
import { Link } from "react-router-dom";

function DrivewayItem(item) {
    const {
        _id,
        address,
        // description,
        // rules,
        image,
        price,
        availableDate,
        // startTime,
        // endTime
    } = item;

    return (
        <div className="card px-1 py-1">
            <Link to={`/driveway/${_id}`}>
                <img
                    alt={address}
                    src={`${image}`}
                />
                <p>{address}</p>
            </Link>
            <div>
                <div>Abailable on {availableDate}</div>
                <span>${price} / hour</span>
            </div>
            {/* <button onClick={addToCart}>Add to cart</button> */}
        </div>
    );
}

export default DrivewayItem;
