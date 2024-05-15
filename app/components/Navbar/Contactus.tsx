"use client"


import React, { useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Link from 'next/link';

const Contactusform = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValues, setInputValues] = useState({
        input1: '', // Nom
        input2: '', // Email
        input3: '', // Heure
        input4: '', // Date
        input5: '', // Message
        input6: '', // Numéro de téléphone
    });
    const form = useRef();
    const [isSent, setIsSent] = useState(false);
    const [isPhoneNumberError, setIsPhoneNumberError] = useState(false);

    const handleChange = (e: { target: { name: string; value: string; }; }) => {
        const { name, value } = e.target;
        setInputValues(prevState => ({ ...prevState, [name]: value }));
    };

    const isValidPhoneNumber = (phoneNumber: string) => {
        const pattern = new RegExp(/^\d{10}$/); // Ce motif permet uniquement 10 chiffres
        return pattern.test(phoneNumber);
    };

    const handleClick = () => {
        alert(`Name: ${inputValues.input1}, Email-address: ${inputValues.input2}, Time: ${inputValues.input4}, Date: ${inputValues.input5}, Message: ${inputValues.input3}`);
        setIsOpen(false);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!isValidPhoneNumber(inputValues.input6)) {
            setIsPhoneNumberError(true); // Afficher la boîte de dialogue d'erreur
            return;
        }

        // Configuration de l'envoi d'email
        emailjs.sendForm('service_9ix79qh', 'template_gcqhjdh', event.currentTarget, 'CM_IvChjIVpbv2XJM')
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                setIsOpen(false); // fermer le modal après l'envoi réussi
                setIsSent(true); // afficher la boîte de dialogue de confirmation
            }, (err) => {
                console.log('FAILED...', err);
            });
    };

    const isDisabled = Object.values(inputValues).some((value) => value === '');

    const closeModal = () => {
        setIsOpen(false);
        setIsSent(false); // fermer la boîte de dialogue de confirmation
        setIsPhoneNumberError(false); // fermer la boîte de dialogue d'erreur
    };

    const openModal = () => {
        setIsOpen(true);
    };

    return (
        <>
            <div className=" inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto md:ml-6 sm:pr-0">
                <div className='hidden lg:block'>
                    <button type="button" className='justify-end text-xl font-semibold bg-transparent py-4 px-6 lg:px-12 navbutton rounded-full hover:bg-navyblue hover:text-white' onClick={openModal}>
                        Contactez nous
                    </button>
                </div>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
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

                                    <div className="py-8 lg:py-8 px-4 mx-auto max-w-screen-md">
                                        <div className="flex flex-shrink-0 items-center justify-center">
                                            <Link href="/" className='text-2xl sm:text-4xl font-semibold text-black'>
                                                SEP Conseils
                                            </Link>
                                        </div>
                                        <p className="mb-8 lg:mb-16 mt-8 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Contactez SEP Conseils pour toute demande</p>
                                        <form action="#" className="space-y-8" onSubmit={handleSubmit}>
                                            <div>
                                                <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">NOM</label>
                                                <input
                                                    id="text"
                                                    name="input1"
                                                    value={inputValues.input1}
                                                    onChange={handleChange}
                                                    type="text"
                                                    autoComplete="current-password"
                                                    required
                                                    className="relative block w-full appearance-none  rounded-md border border-linegrey px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                    placeholder="Nom..."
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">NUMERO DE TELEPHONE</label>
                                                <input
                                                    id="phone"
                                                    name="input6"
                                                    value={inputValues.input6}
                                                    onChange={handleChange}
                                                    type="tel"
                                                    required
                                                    className={`relative block w-full appearance-none  rounded-md border border-linegrey px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${isPhoneNumberError ? 'border-red-500' : ''}`}
                                                    placeholder="Numéro de téléphone..."
                                                />
                                                {isPhoneNumberError && (
                                                    <p className="mt-2 text-xs text-red-500">Veuillez entrer un numéro de téléphone valide de 10 chiffres.</p>
                                                )}
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">EMAIL</label>
                                                <input
                                                    id="email"
                                                    name="input2"
                                                    value={inputValues.input2}
                                                    onChange={handleChange}
                                                    type="email"
                                                    autoComplete="current-password"
                                                    required
                                                    className="relative block w-full appearance-none  rounded-md border border-linegrey px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                    placeholder="...@email.com"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">HEURE POUR ÊTRE RECONTACTÉ(E)</label>
                                                <input
                                                    id="time"
                                                    name="input4"
                                                    value={inputValues.input4}
                                                    onChange={handleChange}
                                                    type="time"
                                                    min="10:00"
                                                    max="18:00"
                                                    required
                                                    className="relative block w-full appearance-none  rounded-md border border-linegrey px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Date</label>
                                                <input
                                                    id="date"
                                                    name="input5"
                                                    value={inputValues.input5}
                                                    onChange={handleChange}
                                                    type="date"
                                                    required
                                                    className="relative block w-full appearance-none  rounded-md border border-linegrey px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>

                                            <div className="sm:col-span-2">
                                                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">MESSAGE</label>
                                                <textarea
                                                    id="message"
                                                    name="input3"
                                                    value={inputValues.input3}
                                                    onChange={handleChange}
                                                    className="relative block w-full appearance-none  rounded-md border border-linegrey px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Votre message..."></textarea>
                                            </div>
                                            <button type="submit"
                                                disabled={isDisabled}
                                                className="py-3 px-5 text-sm disabled:opacity-50 font-medium w-full text-center text-white rounded-lg bg-blue focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Envoyer</button>

                                        </form>

                                    </div>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            {/* Boîte de dialogue de confirmation */}
            <Transition appear show={isSent} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={closeModal}>
                    <div className="flex items-center justify-center min-h-screen">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
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
                            <div className="bg-white rounded-lg p-6 mx-4 md:mx-auto shadow-xl max-w-sm z-50">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                    Message envoyé
                                </Dialog.Title>
                                <div className="mt-2 text-sm text-gray-500">
                                    Votre message a été envoyé avec succès.
                                </div>
                                <div className="mt-4 flex justify-end">
                                    <button
                                        type="button"
                                        className="px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={closeModal}
                                    >
                                        OK
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default Contactusform;
