import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_DRIVEWAYS } from '../utils/queries';
import DrivewayItem from '../components/DrivewayItem'
import spinner from '../assets/spinner.gif';

function SearchResults() {
    const { zipcode } = useParams();

    const { loading, data } = useQuery(QUERY_DRIVEWAYS, {
        variables: { zip: Number(zipcode) },
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    function filterDriveways() {
        console.log("Driveways!!!: ", data)
        return data?.driveways.filter((driveway) => driveway.isReserved === null) || []
    }

    return (
        <div className="container my-1">
            <h2>Search Results (ZIP CODE : {zipcode})</h2>
            {data.driveways.length ? (
                <div className="flex-row">
                    {filterDriveways().map((driveway) => (
                        <DrivewayItem {...driveway} key={driveway._id}
                        />
                    ))}
                </div>
            ) : (
                <h3>There is no driveway posted yet!</h3>
            )}
            {loading ? <img src={spinner} alt="loading" /> : null}
        </div>
    );
}

export default SearchResults;