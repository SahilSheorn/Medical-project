import React, { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Address = () => {
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

    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [currentAddressIndex, setCurrentAddressIndex] = useState(null);
    const [isSubmittingAddress , setIsSubmittingAddress] = useState(false);
    const [addressToDelete, setAddressToDelete] = useState(null);

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

    const handleCloseModalAddress = () => {
        setIsModalOpenAddress(false);
        setIsEditingAddress(false);
        setCurrentAddressIndex(null);
    };

    const handleInputChangeAddress = (e) => {
        const { name, value } = e.target;
        setNewAddress({ ...newAddress, [name]: value });
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

    const fetchAddress = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/auth/address');
            const sortedData = response.data.data.sort((a, b) => a.hno.localeCompare(b.hno));
            setAddress(sortedData);
        } catch (error) {
            console.error('Error fetching address data', error);
        }
    };

    useEffect(() => {
        fetchAddress();
    }, []);

    const handleDeleteAddress = async () => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/auth/address/${addressToDelete._id}`);
            if (response.status === 200) {
                const updatedAddress = address.filter((_, i) => i !== addressToDelete.index);
                setAddress(updatedAddress);
                toast.success('Address deleted successfully.');
                handleCloseConfirmModalAddress();
            } else {
                toast.error('Failed to delete the Address. Status Code: ' + response.status);
            }
        } catch (error) {
            console.error('Error deleting Address', error);
            toast.error('Failed to delete Address. Error: ' + error.message);
        }
    };

    const handleOpenConfirmModalAddress = (index) => {
        setAddressToDelete({ ...address[index], index });
        setIsConfirmModalOpenAddress(true);
    };

    const handleCloseConfirmModalAddress = () => {
        setAddressToDelete(null);
        setIsConfirmModalOpenAddress(false);
    };

    const sortAddress = () => {
        const sortedAddress = [...address].sort((a, b) => a.hno.localeCompare(b.hno));
        setAddress(sortedAddress);
    };

    return (
        <div>
            <Navbar />
            <div className="p-6">
                <button
                    onClick={() => handleOpenModalAddress()}
                    className="mb-4 ml-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add Address
                </button>

                <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr className='text-center'>
                                <th scope="col" className="py-3 px-6">House No.</th>
                                <th scope="col" className="py-3 px-6">Area</th>
                                <th scope="col" className="py-3 px-6">Landmark</th>
                                <th scope="col" className="py-3 px-6">City</th>
                                <th scope="col" className="py-3 px-6">State</th>
                                <th scope="col" className="py-3 px-6">Status</th>
                                <th scope="col" className="py-3 px-6">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {address.map((add, index) => (
                                <tr className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                                    <td className="py-4">{add.hno}</td>
                                    <td className="py-4">{add.area}</td>
                                    <td className="py-4">{add.landmark}</td>
                                    <td className="py-4">{add.city}</td>
                                    <td className="py-4">{add.state}</td>
                                    <td className="py-4">
                                        {add.status === 'Active' ? (
                                            <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                                        ) : (
                                            <FontAwesomeIcon icon={faTimes} className="text-red-500" />
                                        )}
                                    </td>
                                    <td className="py-4 px-6">
                                        <button
                                            onClick={() => handleOpenModalAddress(index)}
                                            className="mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleOpenConfirmModalAddress(index)}
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
                                            <option value="Inactive">Inactive</option>
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

export default Address;
