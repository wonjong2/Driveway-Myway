import React, { useEffect } from 'react';
// import ProductItem from '../ProductItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_DRIVEWAYS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_DRIVEWAYS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';

function Driveways() {
  const [state, dispatch] = useStoreContext();

  const { driveways } = state;

  const { loading, data } = useQuery(QUERY_ALL_DRIVEWAYS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_DRIVEWAYS,
        driveways: data.driveways,
      });
      data.driveways.forEach((driveway) => {
        idbPromise('driveways', 'put', driveway);
      });
    } else if (!loading) {
      idbPromise('driveways', 'get').then((driveways) => {
        dispatch({
          type: UPDATE_DRIVEWAYS,
          driveways: driveways,
        });
      });
    }
  }, [data, loading, dispatch]);

//   function filterProducts() {
//     if (!currentCategory) {
//       return state.products;
//     }

//     return state.products.filter(
//       (product) => product.category._id === currentCategory
//     );
//   }

  return (
    <div className="my-2">
      <h2>Our Driveways:</h2>
      {state.driveways.length ? (
        <div className="flex-row">
          {driveways.map((driveway) => (
          <div key={driveways._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
                {driveway.address} <br />
                <span style={{ fontSize: '1rem' }}>
                    Description {driveway.description}
                </span>
            </h4>
            <div className="card-body bg-light p-2">
              <p>{driveway.startTime}</p>
            </div>
        </div>
         ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default Driveways;
