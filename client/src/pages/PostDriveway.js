import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { POST_DRIVEWAY, UPDATE_DRIVEWAY } from '../utils/mutations';

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

function PostDriveway({
    driveway = {},
}) {
    const [formState, setFormState] = useState({
        address: '',
        description: '',
        rules: '',
        image: '',
        price: '',
        availableDate: '',
        startTime: '',
        endTime: '',
        zipcode: '',
        ... driveway
    });
    const [fileimage, setImage] = useState("");
    const [url, setUrl] = useState(driveway?.image ?? "");
    const [postDriveway, { error }] = useMutation(POST_DRIVEWAY);
  const [updateDriveway] = useMutation(UPDATE_DRIVEWAY);

    const handleUploadImage = () => {
        const data = new FormData()
        data.append("file", fileimage)
        data.append("upload_preset", "image_upload")
        data.append("cloud_name", "dgmjt3z0f")
        fetch(" https://api.cloudinary.com/v1_1/dgmjt3z0f/image/upload", {
            method: "post",
            body: data
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data.url)

                setUrl(data.url)

                setFormState({
                    ...formState,
                    image: data.url,
                })
            })
            .catch(err => console.log(err));
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        function convert24To12(timeString) {
            const time = timeString.split(':');

            if (time[0] === '12') {
                return `${time[0]}:${time[1]} PM`;
            } else if (time[0] > '12') {
                return `${time[0] - 12}:${time[1]} PM`;
            } else {
                return `${time[0]}:${time[1]} AM`;
            }
        };

        if (
            !(
                formState.address &&
                formState.price &&
                formState.availableDate &&
                formState.startTime &&
                formState.endTime &&
                formState.zipcode
            )
        ) {
            return alert("Please enter all required information that has * mark");
        }

        if (formState.endTime <= formState.startTime) {
            return alert("The end time must be later than the start time");
        }

        // get token
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }
        console.log(formState.image)
        try {
            const dateValue = formState.availableDate.split('-');
            const date = new Date(dateValue[0], dateValue[1] - 1, dateValue[2]);
            const variables = { ...formState, price: Number(formState.price), availableDate: date, image: formState.image ? formState.image : 'default.jpg', startTime: convert24To12(formState.startTime), endTime: convert24To12(formState.endTime) }
            const mutationRes = driveway._id
                ? await updateDriveway({ variables })
                : await postDriveway({ variables });
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
    const handleUploadChange = (event) => {
        setImage(event.target.files[0])
    };

    return (
        <div className="container my-1">
            <h2>
                {driveway._id ? 'Update' : 'Post'} Driveway
            </h2>
            <div className="d-flex flex-column align-items-center">
                <form style={styles.form} onSubmit={handleFormSubmit}>
                    <div className="input-group mx-auto mt-3 mb-2">
                        <span className="input-group-text" style={styles.inputLabel} id="basic-addon1">*Address</span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Street, City, State"
                            aria-describedby="basic-addon1"
                            name="address"
                            id="address"
                            value={formState.address}
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
                            value={formState.description}
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
                            value={formState.rules}
                            onChange={handleChange} />
                    </div>
                    <div className="input-group mx-auto mb-2">
                        <span className="input-group-text" style={styles.inputLabel} id="basic-addon1">*Price ($/hour)</span>
                        <input
                            type="number"
                            className="form-control"
                            aria-describedby="basic-addon1"
                            name="price"
                            id="price"
                            value={formState.price}
                            onChange={handleChange} />
                    </div>
                    <div className="input-group mx-auto mb-2">
                        <span className="input-group-text" style={styles.inputLabel} id="basic-addon1">*Available date</span>
                        <input
                            type="date"
                            className="form-control"
                            aria-describedby="basic-addon1"
                            name="availableDate"
                            id="availableDate"
                            value={formState.availableDate}
                            onChange={handleChange} />
                    </div>
                    <div className="input-group mx-auto mb-2">
                        <span className="input-group-text" style={styles.inputLabel} id="basic-addon1">*Start Time</span>
                        <input
                            type="time"
                            className="form-control"
                            aria-describedby="basic-addon1"
                            name="startTime"
                            id="startTime"
                            value={formState.startTime}
                            onChange={handleChange} />
                    </div>
                    <div className="input-group mx-auto mb-2">
                        <span className="input-group-text" style={styles.inputLabel} id="basic-addon1">*End Time</span>
                        <input
                            type="time"
                            className="form-control"
                            aria-describedby="basic-addon1"
                            name="endTime"
                            id="endTime"
                            value={formState.endTime}
                            onChange={handleChange} />
                    </div>
                    <div className="input-group mx-auto mb-2">
                        <span className="input-group-text" style={styles.inputLabel} id="basic-addon1">*ZIP Code</span>
                        <input
                            type="number"
                            className="form-control"
                            aria-describedby="basic-addon1"
                            name="zipcode"
                            id="zipcode"
                            value={formState.zipcode}
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
                            onChange={handleUploadChange} />
                        <button type="button" onClick={handleUploadImage}>Upload</button>
                    </div>
                    <img src={url} />
                    <div className="flex-column flex-end">
                        <button type="submit" >Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PostDriveway;
