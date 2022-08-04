import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLazyQuery, useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { POST_DRIVEWAY } from '../utils/mutations';
import { QUERY_ZIPCODE } from '../utils/queries';

function PostDriveway() {
    const [formState, setFormState] = useState({
        address: '',
        description: '',
        rules: '',
        image: '',
        price: '',
        availableDate: '',
        stratTime: '',
        endTime: '',
        zipcode: '',
    });

    const [getLocation, { loading }] = useLazyQuery(QUERY_ZIPCODE);
    const [postDriveway, { error }] = useMutation(POST_DRIVEWAY);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // get token
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const { data } = await getLocation({
                variables: { zip: Number(formState.zipcode) }
            });

            console.log("data!!!: ", data);
            formState.zipcode = data.zipcode._id;

            const mutationRes = await postDriveway({
                variables: { ...formState, price: Number(formState.price) }
            });
            console.log("data!!!: ", mutationRes.data);
            window.location.assign('/');

        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (
        <div className="container my-1">
            <h2>Post Driveway</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="flex-row space-between my-2">
                    <label htmlFor="address">Address:</label>
                    <input
                        placeholder="Address"
                        name="address"
                        type="text"
                        id="address"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex-row space-between my-2">
                    <label htmlFor="description">Description:</label>
                    <input
                        placeholder="Description"
                        name="description"
                        type="text"
                        id="description"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex-row space-between my-2">
                    <label htmlFor="rules">Rules:</label>
                    <textarea
                        placeholder="Rules"
                        name="rules"
                        type="text"
                        id="rules"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex-row space-between my-2">
                    <label htmlFor="price">Price($ per hour):</label>
                    <input
                        placeholder="$$"
                        name="price"
                        type="number"
                        id="price"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex-row space-between my-2">
                    <label htmlFor="date">Available Date:</label>
                    <input
                        placeholder="MM/DD/YYYY"
                        name="availableDate"
                        type="date"
                        id="date"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex-row space-between my-2">
                    <label htmlFor="start">Start Time:</label>
                    <input
                        placeholder="HH"
                        name="startTime"
                        type="time"
                        id="start"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex-row space-between my-2">
                    <label htmlFor="end">End Time:</label>
                    <input
                        placeholder="HH"
                        name="endTime"
                        type="time"
                        id="end"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex-row space-between my-2">
                    <label htmlFor="zip">ZIP Code:</label>
                    <input
                        placeholder="ZIP"
                        name="zipcode"
                        type="number"
                        id="zip"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex-row space-between my-2">
                    <label htmlFor="image">Photo:</label>
                    <input
                        placeholder="filename"
                        name="image"
                        type="text"
                        id="image"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex-row flex-end">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default PostDriveway;
