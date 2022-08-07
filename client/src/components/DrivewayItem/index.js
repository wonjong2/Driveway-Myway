import React from "react";
import { Link } from "react-router-dom";

function DrivewayItem(item) {
    const {
        _id,
        address,
        image,
        price,
        availableDate,
    } = item;

    return (
        <div className="card px-1 py-1">
            <Link to={`/driveway/${_id}`}>
                <img
                    alt={address}
                    src={image === 'default.jpg' ? `/images/${image}` : `${image}`}
                />
                <p>{address}</p>
            </Link>
            <div>
                <div>Abailable on {availableDate}</div>
                <span>${price} / hour</span>
            </div>
        </div>
    );
}

export default DrivewayItem;
