import React, { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';

const Settings = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [doctors, setDoctors] = useState([]);
    const [img, setImg] = useState("");
    // const [url, setUrl] = useState('');
    const [newDoctor, setNewDoctor] = useState({
        image: '',
        drId: '',
        name: '',
        desigination: '',
        status: 'Inactive'
    });

    const [isEditing, setIsEditing] = useState(false);
    const [currentDoctorIndex, setCurrentDoctorIndex] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [doctorToDelete, setDoctorToDelete] = useState(null);


    const [isModalOpenAddress, setIsModalOpenAddress] = useState(false);
    const [isConfirmModalOpenAddress, setIsConfirmModalOpenAddress] = useState(false);
    const [address, setAddress] = useState([]);
    const [newAddress, setNewAddress] = useState({
        hno: '',
        area: '',
        landmark: '',
        city: '',
        state: '',
        status: 'Active',
    });

    // const uploadImg = async (img) => {
    //     const data = new FormData();
    //     data.append("file", img);
    //     data.append("upload_present", "ml_deafult");
    //     data.append("cloud_name", "drpwwh9rm");

    //     try {
    //         const response = await fetch("https://api.cloudinary.com/v1_1/drpwwh9rm/image/upload", {
    //             method: "POST",
    //             body: data
    //         });
    //         const result = await response.json();
    //         if (result.secure_url) {
    //             setUrl(result.secure_url);
    //             return result.secure_url;
    //         } else {
    //             throw new Error("Image upload failed");
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         toast.error("Image upload failed");
    //         return null;
    //     }
    // }

    // const handleImageUpload = async (img) => {
    //     const imgUrl = await uploadImg(img);
    //     if (!imgUrl) {
    //         toast.error("Image upload failed, cannot proceed");
    //     }
    // }

    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [currentAddressIndex, setCurrentAddressIndex] = useState(null);
    const [isSubmittingAddress, setIsSubmittingAddress] = useState(false);
    const [addressToDelete, setAddressToDelete] = useState(null);


    const handleOpenModal = (index = null) => {
        if (index !== null) {
            setNewDoctor(doctors[index]);
            setIsEditing(true);
            setCurrentDoctorIndex(index);
        } else {
            setNewDoctor({ image: '', drId: '', name: '', desigination: '', status: 'Active' });
            setIsEditing(false);
        }
        setIsModalOpen(true);
    };

    const handleOpenModalAddress = (index = null) => {
        if (index !== null) {
            setNewAddress(address[index]);
            setIsEditingAddress(true);
            setCurrentAddressIndex(index);
        } else {
            setNewAddress({ hno: '', area: '', landmark: '', city: '', state: '', status: 'Active' });
            setIsEditingAddress(false);
        }
        setIsModalOpenAddress(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsEditing(false);
        setCurrentDoctorIndex(null);
    };

    const handleCloseModalAddress = () => {
        setIsModalOpenAddress(false);
        setIsEditingAddress(false);
        setCurrentAddressIndex(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewDoctor({ ...newDoctor, [name]: value });
    }

    const handleImageChange = (e) => {
        // const file = e.target.files[0];
        // console.log("data img", img);
        setImg(e.target.files[0]);
        console.log("data img", img);
    }

    const handleInputChangeAddress = (e) => {
        const { name, value } = e.target;
        setNewAddress({ ...newAddress, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Upload image to Cloudinary
            const formData = new FormData();
            formData.append("file", img);
            formData.append("upload_preset", "sahilks");
            formData.append("cloud_name", "drpwwh9rm");

            const response = await fetch("https://api.cloudinary.com/v1_1/drpwwh9rm/image/upload", {
                method: 'POST',
                body: formData
            });
            const result = await response.json();

            if (!result.secure_url) {
                throw new Error('Image upload failed');
            }

            // Update newDoctor state with the image URL
            const updatedDoctor = { ...newDoctor, image: result.secure_url };
            console.log("img", result.secure_url);

            const { drId, name, desigination, status } = updatedDoctor;

            if (!result.secure_url || !drId || !name || !desigination || !status) {
                toast.error('Please fill all the fields');
                setIsSubmitting(false);
                return;
            }

            // Check if there are already 3 active doctors
            const activeDoctorsCount = doctors.filter((doctor) => doctor.status === 'Active').length;
            if (status === 'Active' && activeDoctorsCount >= 3) {
                if (!isEditing || (isEditing && doctors[currentDoctorIndex].status !== 'Active')) {
                    toast.error('There are already 3 active doctors. Please change the status to inactive or edit an existing doctor.');
                    setIsSubmitting(false);
                    return;
                }
            }

            // Submit form data
            let res;
            if (isEditing) {
                res = await fetch(`http://localhost:5000/api/auth/doctor/${newDoctor._id}`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(updatedDoctor)
                });
            } else {
                res = await fetch("http://localhost:5000/api/auth/doctor", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(updatedDoctor)
                });
            }

            const data = await res.json();

            if (res.status >= 400) {
                toast.error(data.error || 'Invalid request');
            } else {
                toast.success(isEditing ? 'Doctor updated successfully' : 'Doctor added successfully');
                if (isEditing) {
                    const updatedDoctors = doctors.map((doctor, index) =>
                        index === currentDoctorIndex ? { ...updatedDoctor, _id: doctor._id } : doctor
                    );
                    setDoctors(updatedDoctors);
                } else {
                    setDoctors([...doctors, data]); // Use the returned data to get the new doctor's ID
                }
                handleCloseModal();
                sortDoctors();
            }
        }
        catch (error) {
            toast.error("Failed to submit the doctor data");
        }
        finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmitAddress = async (e) => {
        e.preventDefault();
        setIsSubmittingAddress(true);

        const { hno, area, landmark, city, state, status } = newAddress;

        if (!hno || !area || !landmark || !city || !state || !status) {
            toast.error('Please fill all the fields');
            setIsSubmittingAddress(false);
            return;
        }

        // Check if there are already 1 active address
        const activeAddressCount = address.filter((address) => address.status === 'Active').length;
        if (status === 'Active' && activeAddressCount >= 1) {
            if (!isEditingAddress || (isEditingAddress && address[currentAddressIndex].status !== 'Active')) {
                toast.error('There are already 1 active address. Please change the status to inactive or edit an existing address.');
                setIsSubmittingAddress(false);
                return;
            }
        }

        try {
            let res;
            if (isEditingAddress) {
                res = await fetch(`http://localhost:5000/api/auth/address/${newAddress._id}`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ hno, area, landmark, city, state, status })
                });
            } else {
                res = await fetch("http://localhost:5000/api/auth/address", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ hno, area, landmark, city, state, status })
                });
            }

            const data = await res.json();

            if (res.status >= 400) {
                toast.error(data.error || 'Invalid request');
            } else {
                toast.success(isEditingAddress ? 'Address updated successfully' : 'Address added successfully');
                if (isEditingAddress) {
                    const updatedAddress = address.map((address, index) =>
                        index === currentAddressIndex ? { ...newAddress, _id: address._id } : address
                    );
                    setAddress(updatedAddress);
                } else {
                    setAddress([...address, data]);
                }
                handleCloseModalAddress();
                sortAddress();
            }
        } catch (error) {
            toast.error("Failed to submit the Address data");
        } finally {
            setIsSubmittingAddress(false);
        }
    };

    const fetchDoctors = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/auth/doctor');
            const sortedData = response.data.data.sort((a, b) => a.drId.localeCompare(b.drId));
            setDoctors(sortedData); // Set the initial doctors data
        } catch (error) {
            console.error('Error fetching doctors data', error);
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchAddress = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/auth/address');
            // Filter only active addresses immediately after fetching
            const activeData = response.data.data.filter(addr => addr.status === 'Active');
            // Sort the active addresses
            const sortedData = activeData.sort((a, b) => a.hno.localeCompare(b.hno));
            setAddress(sortedData);
        } catch (error) {
            console.error('Error fetching address data', error);
        }
    };

    useEffect(() => {
        fetchAddress();
    }, []);

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/auth/doctor/${doctorToDelete._id}`);
            if (response.status === 200) {
                const updatedDoctors = doctors.filter((_, i) => i !== doctorToDelete.index);
                setDoctors(updatedDoctors);
                toast.success('Doctor deleted successfully.');
                handleCloseConfirmModal();
            } else {
                toast.error('Failed to delete the doctor. Status Code: ' + response.status);
            }
        } catch (error) {
            console.error('Error deleting doctor', error);
            toast.error('Failed to delete doctor. Error: ' + error.message);
        }
    };

    const handleDeleteAddress = async () => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/auth/address/${addressToDelete._id}`);
            if (response.status === 200) {
                const updatedAddress = address.filter((_, i) => i !== addressToDelete.index);
                setAddress(updatedAddress);
                toast.success('Address deleted successfully.');
                handleCloseConfirmModal();
            } else {
                toast.error('Failed to delete the Address. Status Code: ' + response.status);
            }
        } catch (error) {
            console.error('Error deleting Address', error);
            toast.error('Failed to delete Address. Error: ' + error.message);
        }
    };

    const handleOpenConfirmModal = (index) => {
        setDoctorToDelete({ ...doctors[index], index });
        setIsConfirmModalOpen(true);
    };

    const handleCloseConfirmModal = () => {
        setDoctorToDelete(null);
        setIsConfirmModalOpen(false);
    };

    // const handleOpenConfirmModalAddress = (index) => {
    //     setAddressToDelete({ ...address[index], index });
    //     setIsConfirmModalOpenAddress(true);
    // };

    const handleCloseConfirmModalAddress = () => {
        setAddressToDelete(null);
        setIsConfirmModalOpenAddress(false);
    };

    const sortDoctors = () => {
        const sortedDoctors = [...doctors].sort((a, b) => a.drId.localeCompare(b.drId));
        setDoctors(sortedDoctors);
    };

    const sortAddress = () => {
        const sortedAddress = [...address].sort((a, b) => a.hno.localeCompare(b.hno));
        setAddress(sortedAddress);
    };


    return (
        <div>
            <Navbar />
            <div className="p-6">
                <div className="flex justify-between items-center mb-3 p-4 bg-white shadow-md rounded-lg">
                    <div className=''>
                        <button
                            onClick={() => handleOpenModal()}
                            className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out shadow-md" >
                            Add Doctor
                        </button>
                    </div>
                    <div className="flex flex-col justify-evenly">
                        <div className='flex justify-evenly'>
                            <div className="flex items-center">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-500 mr-2" />
                                <p className="text-lg font-semibold text-gray-700 border-b-2 border-blue-500">Lab Address</p>
                            </div>
                            <div>
                                {address.map((add, index) => (
                                    <tr className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                                        <td className="py-2 px-6">
                                            <button
                                                onClick={() => handleOpenModalAddress(index)}
                                                className="mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                                            >
                                                Edit
                                            </button>
                                            {/* <button
                                                onClick={() => handleOpenConfirmModalAddress(index)}
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                            >
                                                Delete
                                            </button> */}
                                        </td>
                                    </tr>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-1">
                            {address.map((item, index) => (
                                <div key={index} className="p-3 bg-gray-100 rounded-lg shadow">
                                    <p className="text-sm text-gray-700">
                                        {item.hno}, <span>{item.area}</span>, <span>{item.landmark}</span>, <span>{item.city}</span>, <span>{item.state}</span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr className='text-center'>
                                <th scope="col" className="py-3 px-6">Image</th>
                                <th scope="col" className="py-3 px-6">DR. ID</th>
                                <th scope="col" className="py-3 px-6">Name</th>
                                <th scope="col" className="py-3 px-6">Desigination</th>
                                <th scope="col" className="py-3 px-6">Status</th>
                                <th scope="col" className="py-3 px-6">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {doctors.map((dr, index) => (
                                <tr className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                                    <td className="py-4 flex justify-center">
                                        <img src={dr.image} alt={`Dr. ${dr.name}`} className="h-10 w-10 rounded-full object-cover" />
                                    </td>
                                    <td className="py-4">{dr.drId}</td>
                                    <td className="py-4">{dr.name}</td>
                                    <td className="py-4">{dr.desigination}</td>
                                    <td className="py-4">
                                        {dr.status === 'Active' ? (
                                            <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                                        ) : (
                                            <FontAwesomeIcon icon={faTimes} className="text-red-500" />
                                        )}
                                    </td>
                                    <td className="py-4 px-6">
                                        <button
                                            onClick={() => handleOpenModal(index)}
                                            className="mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleOpenConfirmModal(index)}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Transition appear show={isModalOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={handleCloseModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            {isEditing ? 'Edit Doctor' : 'Add New Doctor'}
                                        </Dialog.Title>
                                        <form className="mt-2" onSubmit={handleSubmit}>
                                            <div className="mt-2">
                                                <label className="block text-sm font-medium text-gray-700">Image</label>
                                                <input
                                                    type="file"
                                                    name="image"
                                                    // value={newDoctor.image}
                                                    onChange={handleImageChange}
                                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                                                />
                                                {/* {newDoctor.image && (
                                                    <img src={newDoctor.image} alt="Doctor" className="mt-2 w-32 h-32 object-cover" />
                                                )} */}
                                            </div>
                                            <div className="mt-4">
                                                <label className="block text-sm font-medium text-gray-700">ID</label>
                                                <input
                                                    type="text"
                                                    name="drId"
                                                    value={newDoctor.drId}
                                                    onChange={handleInputChange}
                                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                            <div className="mt-4">
                                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={newDoctor.name}
                                                    onChange={handleInputChange}
                                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                            <div className="mt-4">
                                                <label className="block text-sm font-medium text-gray-700">Desigination</label>
                                                <input
                                                    type="text"
                                                    name="desigination"
                                                    value={newDoctor.desigination}
                                                    onChange={handleInputChange}
                                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                            <div className="mt-4">
                                                <label className="block text-sm font-medium text-gray-700">Status</label>
                                                <select
                                                    name="status"
                                                    value={newDoctor.status}
                                                    onChange={handleInputChange}
                                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                                                >
                                                    <option value="Active">Active</option>
                                                    <option value="Inactive">Inactive</option>
                                                </select>
                                            </div>
                                            <div className="mt-4">
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                >
                                                    {isEditing ? 'Update Doctor' : 'Add Doctor'}
                                                </button>
                                            </div>
                                        </form>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>

                <Transition appear show={isConfirmModalOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={handleCloseConfirmModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Confirm Deletion
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Are you sure you want to delete this doctor? This action cannot be undone.
                                            </p>
                                        </div>
                                        <div className="mt-4">
                                            <button
                                                type="button"
                                                className="mr-2 inline-flex justify-center rounded-md border border-transparent bg-gray-500 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                                                onClick={handleCloseConfirmModal}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                                onClick={handleDelete}
                                            >
                                                Okay
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>

                <Transition show={isModalOpenAddress} as={Fragment}>
                    <div className="fixed inset-0 overflow-y-auto flex justify-center items-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" onClick={handleCloseModalAddress} />
                        </Transition.Child>

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="relative z-10 w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">
                                    {isEditingAddress ? 'Edit Address' : 'Add New Address'}
                                </h3>
                                <form className="mt-2" onSubmit={handleSubmitAddress}>
                                    <div className="mt-2">
                                        <label className="block text-sm font-medium text-gray-700">House No.</label>
                                        <input
                                            type="text"
                                            name="hno"
                                            value={newAddress.hno}
                                            onChange={handleInputChangeAddress}
                                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-sm font-medium text-gray-700">Area</label>
                                        <input
                                            type="text"
                                            name="area"
                                            value={newAddress.area}
                                            onChange={handleInputChangeAddress}
                                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-sm font-medium text-gray-700">Landmark</label>
                                        <input
                                            type="text"
                                            name="landmark"
                                            value={newAddress.landmark}
                                            onChange={handleInputChangeAddress}
                                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-sm font-medium text-gray-700">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={newAddress.city}
                                            onChange={handleInputChangeAddress}
                                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-sm font-medium text-gray-700">State</label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={newAddress.state}
                                            onChange={handleInputChangeAddress}
                                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-sm font-medium text-gray-700">Status</label>
                                        <select
                                            name="status"
                                            value={newAddress.status}
                                            onChange={handleInputChangeAddress}
                                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                                        >
                                            <option value="Active">Active</option>
                                            {/* <option value="Inactive">Inactive</option> */}
                                        </select>
                                    </div>
                                    <div className="mt-4">
                                        <button
                                            type="submit"
                                            disabled={isSubmittingAddress}
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        >
                                            {isEditingAddress ? 'Update Address' : 'Add Address'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </Transition.Child>
                    </div>
                </Transition>

                <Transition appear show={isConfirmModalOpenAddress} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={handleCloseConfirmModalAddress}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Confirm Deletion
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Are you sure you want to delete this address? This action cannot be undone.
                                            </p>
                                        </div>
                                        <div className="mt-4">
                                            <button
                                                type="button"
                                                className="mr-2 inline-flex justify-center rounded-md border border-transparent bg-gray-500 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                                                onClick={handleCloseConfirmModalAddress}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                                onClick={handleDeleteAddress}
                                            >
                                                Okay
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>

                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    style={{ top: '10%', left: '50%', transform: 'translateX(-50%)' }}
                />
            </div>
        </div>
    );
};

export default Settings;
