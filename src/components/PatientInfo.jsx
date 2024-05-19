import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './patient.css';
import { useDispatch } from "react-redux";
import { setPatientData } from '../redux/formDataSlice';
import Test from "./Test";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PatientInfo = ({ handleTabClick }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        patientName: '',
        dateOfBirth: '',
        patientId: '',
        age: '',
        gender: '',
        email: '',
        phoneNumber: '',
        zipCode: '',
        medicalHistory: '',
        referringDoctor: '',
        collection: '',
    });

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(setPatientData({ value, name }));
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleNextClick = () => {
        if (!formData.gender) {
            toast.warn("Please select a gender first.", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            handleTabClick('Medical Test');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="container print-d-none">
            <ToastContainer />
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title">Patient Information</h2>
                    <form onSubmit={handleSubmit}>
                        <table className="table table-borderless">
                            <tbody>
                                <tr>
                                    <td>
                                        <label htmlFor="firstName" className="form-label">
                                            Name
                                        </label>
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="firstName"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </td>
                                    <td>
                                        <label htmlFor="PatientId" className="form-label">
                                            Patient Id
                                        </label>
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="PatientId"
                                            name="patientId"
                                            value={formData.patientId}
                                            onChange={handleChange}
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label className="form-label">Gender</label>
                                    </td>
                                    <td colSpan="3">
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="gender"
                                                id="male"
                                                value="male"
                                                checked={formData.gender === 'male'}
                                                onChange={handleChange}
                                                required
                                            />
                                            <label className="form-check-label" htmlFor="male">
                                                Male
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="gender"
                                                id="female"
                                                value="female"
                                                checked={formData.gender === 'female'}
                                                onChange={handleChange}
                                                required
                                            />
                                            <label className="form-check-label" htmlFor="female">
                                                Female
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="gender"
                                                id="other"
                                                value="other"
                                                checked={formData.gender === 'other'}
                                                onChange={handleChange}
                                                required
                                            />
                                            <label className="form-check-label" htmlFor="other">
                                                Other
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="age" className="form-label">
                                            Age
                                        </label>
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="age"
                                            name="age"
                                            value={formData.age}
                                            onChange={handleChange}
                                            required
                                        />
                                    </td>
                                    <td>
                                        <label htmlFor="email" className="form-label">
                                            Email
                                        </label>
                                    </td>
                                    <td colSpan="3">
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="phoneNumber" className="form-label">
                                            Phone Number
                                        </label>
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            required
                                        />
                                    </td>
                                    <td>
                                        <label htmlFor="zipCode" className="form-label">
                                            Zip Code
                                        </label>
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="zipCode"
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleChange}
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="referringDoctor" className="form-label">
                                            Referring Doctor
                                        </label>
                                    </td>
                                    <td>
                                        <select
                                            className="form-select"
                                            id="referringDoctor"
                                            name="referringDoctor"
                                            value={formData.referringDoctor}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select a Doctor</option>
                                            <option value="Self">Self</option>
                                            <option value="Dr. Smith">Dr. Smith</option>
                                            <option value="Dr. Johnson">Dr. Johnson</option>
                                            {/* Add more doctor names as needed */}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="medicalHistory" className="form-label">
                                            Address
                                        </label>
                                    </td>
                                    <td colSpan="3">
                                        <textarea
                                            className="form-control resize-none"
                                            id="medicalHistory"
                                            name="medicalHistory"
                                            value={formData.medicalHistory}
                                            onChange={handleChange}
                                            required
                                        ></textarea>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        {/* <button type="submit" className="btn btn-primary">
                            Submit
                        </button> */}
                    </form>

                    <div className="flex justify-end">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-1 py-2 px-5 rounded"
                            onClick={handleNextClick}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientInfo;
