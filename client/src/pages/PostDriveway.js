import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { POST_DRIVEWAY } from '../utils/mutations';

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

    const [postDriveway, { error }] = useMutation(POST_DRIVEWAY);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // get token
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const mutationRes = await postDriveway({
                variables: { ...formState, price: Number(formState.price), image: formState.image ? formState.image : 'default.jpg' }
            });
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
                <div className="input-group mx-auto">
                    <span className="input-group-text" id="basic-addon1">Address</span>
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Address"
                        aria-describedby="basic-addon1"
                        name="address"
                        id="address"
                        onChange={handleChange} />
                </div>
                <div className="input-group mx-auto">
                    <span className="input-group-text" id="basic-addon1">Description</span>
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Description"
                        aria-describedby="basic-addon1"
                        name="description"
                        id="description"
                        onChange={handleChange} />
                </div>
                {/* <div className="flex-column space-between my-2">
                    <label htmlFor="address">Address:</label>
                    <div className="input-group">
                        <input
                            placeholder="Address"
                            name="address"
                            type="text"
                            id="address"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="flex-column space-between my-2">
                    <label htmlFor="description">Description:</label>
                    <div className="input-group">
                        <input
                            placeholder="Description"
                            name="description"
                            type="text"
                            id="description"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="flex-column space-between my-2">
                    <label htmlFor="rules">Rules:</label>
                    <div className="input-group">
                        <textarea
                            placeholder="Rules"
                            name="rules"
                            type="text"
                            id="rules"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="flex-column space-between my-2">
                    <label htmlFor="price">Price($ per hour):</label>
                    <div className="input-group">
                        <input
                            placeholder="$$"
                            name="price"
                            type="number"
                            id="price"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="flex-column space-between my-2">
                    <label htmlFor="date">Available Date:</label>
                    <div className="input-group">
                        <input
                            placeholder="MM/DD/YYYY"
                            name="availableDate"
                            type="date"
                            id="date"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="flex-column space-between my-2">
                    <label htmlFor="start">Start Time:</label>
                    <div className="input-group">
                        <input
                            placeholder="HH"
                            name="startTime"
                            type="time"
                            id="start"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="flex-column space-between my-2">
                    <label htmlFor="end">End Time:</label>
                    <div className="input-group">
                        <input
                            placeholder="HH"
                            name="endTime"
                            type="time"
                            id="end"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="flex-column space-between my-2">
                    <label htmlFor="zip">ZIP Code:</label>
                    <div className="input-group">
                        <input
                            placeholder="ZIP"
                            name="zipcode"
                            type="number"
                            id="zip"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="flex-column space-between my-2">
                    <label htmlFor="image">Photo:</label>
                    <div className="input-group">
                        <input
                            placeholder="filename"
                            name="image"
                            type="text"
                            id="image"
                            onChange={handleChange}
                        />
                    </div>
                </div> */}
                <div className="flex-column flex-end">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default PostDriveway;
