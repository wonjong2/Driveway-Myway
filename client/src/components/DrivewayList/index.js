import React, { useEffect } from 'react';
import Driveway from '../Driveway';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_DRIVEWAYS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';

function ProductList() {
  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;

  const { loading, data, error } = useQuery(QUERY_ALL_DRIVEWAYS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.alldriveways,
      });
      data.alldriveways.forEach((driveway) => {
        idbPromise('products', 'put', driveway);
      });
    } else if (!loading) {
      
      idbPromise('products', 'get').then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      console.log(state.products)
      return state.products;
    }

    return state.products.filter(
      (driveway) => driveway.category._id === currentCategory
    );
  }

  return (
    <div className="my-2">
      <h2 style={{'font-family': 'Calibri'}}>Available Driveways:</h2>
      {state.products.length ? (
        <div className="flex-row">
          {filterProducts().map((driveway) => (
            <Driveway
              key={driveway._id}
              _id={driveway._id}
              image={driveway.image}
              address={driveway.address}
              price={driveway.price}
              zipcode={driveway.zipcode.zip}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
