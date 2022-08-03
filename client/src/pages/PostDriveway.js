import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { POST_DRIVEWAY, ADD_ZIPCODE } from '../utils/mutations';

function PostDriveway() {
    const [formState, setFormState] = useState({ email: '', password: '' });
    // const [postDriveway] = useMutation(POST_DRIVEWAY);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        // const mutationResponse = await addUser({
        //     variables: {
        //         email: formState.email,
        //         password: formState.password,
        //         firstName: formState.firstName,
        //         lastName: formState.lastName,
        //     },
        // });
        // const token = mutationResponse.data.addUser.token;
        // Auth.login(token);
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
            {/* <Link to="/login">← Go to Login</Link> */}

            <h2>Post Driveway</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="flex-row space-between my-2">
                    <label htmlFor="address">Address:</label>
                    <input
                        placeholder="Address"
                        name="address"
                        type="address"
                        id="address"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex-row space-between my-2">
                    <label htmlFor="description">Description:</label>
                    <input
                        placeholder="Description"
                        name="description"
                        type="description"
                        id="description"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex-row space-between my-2">
                    <label htmlFor="rules">Rules:</label>
                    <textarea
                        placeholder="Rules"
                        name="rules"
                        type="rules"
                        id="rules"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex-row space-between my-2">
                    <label htmlFor="price">Price($ per hour):</label>
                    <input
                        placeholder="$$"
                        name="price"
                        type="price"
                        id="price"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex-row space-between my-2">
                    <label htmlFor="date">Available Date:</label>
                    <input
                        placeholder="MM/DD/YYYY"
                        name="date"
                        type="date"
                        id="date"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex-row space-between my-2">
                    <label htmlFor="start">Start Time:</label>
                    <input
                        placeholder="HH"
                        name="start"
                        type="start"
                        id="start"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex-row space-between my-2">
                    <label htmlFor="end">End Time:</label>
                    <input
                        placeholder="HH"
                        name="end"
                        type="end"
                        id="end"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex-row space-between my-2">
                    <label htmlFor="zip">ZIP Code:</label>
                    <input
                        placeholder="ZIP"
                        name="zip"
                        type="zip"
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
