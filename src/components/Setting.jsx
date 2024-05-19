import React, { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';

const Settings = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [doctors, setDoctors] = useState([]);
    const [newDoctor, setNewDoctor] = useState({
        image: '',
        name: '',
        designation: '',
        status: 'Active',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [currentDoctorIndex, setCurrentDoctorIndex] = useState(null);

    useEffect(() => {
        const storedDoctors = localStorage.getItem('doctors');
        if (storedDoctors) {
            setDoctors(JSON.parse(storedDoctors));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('doctors', JSON.stringify(doctors));
    }, [doctors]);

    const handleOpenModal = (index = null) => {
        if (index !== null) {
            setNewDoctor(doctors[index]);
            setIsEditing(true);
            setCurrentDoctorIndex(index);
        } else {
            setNewDoctor({ image: '', name: '', designation: '', status: 'Active' });
            setIsEditing(false);
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsEditing(false);
        setCurrentDoctorIndex(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewDoctor({ ...newDoctor, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            const updatedDoctors = doctors.map((doctor, index) =>
                index === currentDoctorIndex ? newDoctor : doctor
            );
            setDoctors(updatedDoctors);
        } else {
            setDoctors([...doctors, newDoctor]);
        }
        setNewDoctor({ image: '', name: '', designation: '', status: 'Active' });
        setIsModalOpen(false);
    };

    const handleDelete = (index) => {
        const updatedDoctors = doctors.filter((_, i) => i !== index);
        setDoctors(updatedDoctors);
    };

    return (
        <div>
            <Navbar />
            <div className="p-6">
                <button
                    onClick={() => handleOpenModal()}
                    className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add Doctor
                </button>

                <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="py-3 px-6">Image</th>
                                <th scope="col" className="py-3 px-6">Name</th>
                                <th scope="col" className="py-3 px-6">Designation</th>
                                <th scope="col" className="py-3 px-6">Action</th>
                                <th scope="col" className="py-3 px-6">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {doctors.map((doctor, index) => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                                    <td className="py-4 px-6">
                                        <img src={doctor.image} alt={`Dr. ${doctor.name}`} className="h-10 w-10 rounded-full object-cover" />
                                    </td>
                                    <td className="py-4 px-6">{doctor.name}</td>
                                    <td className="py-4 px-6">{doctor.designation}</td>
                                    <td className="py-4 px-6">
                                        <button
                                            onClick={() => handleOpenModal(index)}
                                            className="mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(index)}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                    <td className="py-4 px-6">
                                        {doctor.status === 'Active' ? (
                                            <FontAwesomeIcon icon={faCheck} className="text-green-500" />
                                        ) : (
                                            <FontAwesomeIcon icon={faTimes} className="text-red-500" />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>

                <Transition appear show={isModalOpen} as={React.Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={handleCloseModal}>
                        <Transition.Child
                            as={React.Fragment}
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
                                    as={React.Fragment}
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
                                        <form onSubmit={handleSubmit} className="mt-2">
                                            <div className="mt-2">
                                                <label className="block text-sm font-medium text-gray-700">Image</label>
                                                <input
                                                    type="text"
                                                    name="image"
                                                    value={newDoctor.image}
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
                                                <label className="block text-sm font-medium text-gray-700">Designation</label>
                                                <input
                                                    type="text"
                                                    name="designation"
                                                    value={newDoctor.designation}
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
            </div>
        </div>
    );
};

export default Settings;
