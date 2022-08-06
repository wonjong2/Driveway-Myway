import React from "react";
import { Link } from "react-router-dom";
//import { pluralize } from "../../utils/helpers"
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

function Driveway({
  reserved,
  ...item
}) {
  const [state, dispatch] = useStoreContext();
  //console.log(item)

  const {
    address,
    description,
    rules,
    image,
    _id,
    price,
    zipcode
  } = item;

  const { cart } = state

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        driveway: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }

  return (
    <div className="card px-1 py-1">
      <Link to={`/driveway/${_id}`}>
        <img className="card-img-top" alt={address} src={`${image}`}/>
        <p>{address}</p>
      </Link>
      <div>
        <div>Found in: {zipcode}</div>
        <span>${price} / hour</span>
      </div>
      {!reserved && (
        <button onClick={addToCart}>Reserve this Parking Stall</button>
      )}
    </div>
  );
}

export default Driveway;
