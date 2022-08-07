import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { POST_DRIVEWAY } from '../utils/mutations';

const styles = {
    form: {
        width: '80%'
    },
    inputLabel: {
        borderTopRightRadius: '0',
        borderBottomRightRadius: '0',
        borderRightWidth: '0',
    }
}

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
            const dateValue = formState.availableDate.split('-');
            const date = new Date(dateValue[0], dateValue[1] - 1, dateValue[2]);
            const mutationRes = await postDriveway({
                variables: { ...formState, price: Number(formState.price), availableDate: date, image: formState.image ? formState.image : 'default.jpg' }
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
            <div className="d-flex flex-column align-items-center">
                <form style={styles.form} onSubmit={handleFormSubmit}>
                    <div className="input-group mx-auto mt-3 mb-2">
                        <span className="input-group-text" style={styles.inputLabel} id="basic-addon1">Address</span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Street, City, State"
                            aria-describedby="basic-addon1"
                            name="address"
                            id="address"
                            onChange={handleChange} />
                    </div>
                    <div className="input-group mx-auto mb-2">
                        <span className="input-group-text" style={styles.inputLabel} id="basic-addon1">Description</span>
                        <textarea
                            type="text"
                            className="form-control"
                            placeholder="Short explanation of your driveway"
                            aria-describedby="basic-addon1"
                            name="description"
                            id="description"
                            onChange={handleChange} />
                    </div>
                    <div className="input-group mx-auto mb-2">
                        <span className="input-group-text" style={styles.inputLabel} id="basic-addon1">Rules</span>
                        <textarea
                            type="text"
                            className="form-control"
                            aria-describedby="basic-addon1"
                            name="rules"
                            id="rules"
                            onChange={handleChange} />
                    </div>
                    <div className="input-group mx-auto mb-2">
                        <span className="input-group-text" style={styles.inputLabel} id="basic-addon1">Price ($/hour)</span>
                        <input
                            type="number"
                            className="form-control"
                            aria-describedby="basic-addon1"
                            name="price"
                            id="price"
                            onChange={handleChange} />
                    </div>
                    <div className="input-group mx-auto mb-2">
                        <span className="input-group-text" style={styles.inputLabel} id="basic-addon1">Available date</span>
                        <input
                            type="date"
                            className="form-control"
                            aria-describedby="basic-addon1"
                            name="availableDate"
                            id="availableDate"
                            onChange={handleChange} />
                    </div>
                    <div className="input-group mx-auto mb-2">
                        <span className="input-group-text" style={styles.inputLabel} id="basic-addon1">Start Time</span>
                        <input
                            type="time"
                            className="form-control"
                            aria-describedby="basic-addon1"
                            name="startTime"
                            id="startTime"
                            onChange={handleChange} />
                    </div>
                    <div className="input-group mx-auto mb-2">
                        <span className="input-group-text" style={styles.inputLabel} id="basic-addon1">End Time</span>
                        <input
                            type="time"
                            className="form-control"
                            aria-describedby="basic-addon1"
                            name="endTime"
                            id="endTime"
                            onChange={handleChange} />
                    </div>
                    <div className="input-group mx-auto mb-2">
                        <span className="input-group-text" style={styles.inputLabel} id="basic-addon1">ZIP Code</span>
                        <input
                            type="number"
                            className="form-control"
                            aria-describedby="basic-addon1"
                            name="zipcode"
                            id="zipcode"
                            onChange={handleChange} />
                    </div>
                    <div className="input-group mx-auto mb-2">
                        <span className="input-group-text" style={styles.inputLabel} id="basic-addon1">Photo</span>
                        <input
                            type="file"
                            className="form-control"
                            aria-describedby="basic-addon1"
                            name="image"
                            id="image"
                            onChange={handleChange} />
                    </div>

                    <div className="flex-column flex-end">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PostDriveway;
