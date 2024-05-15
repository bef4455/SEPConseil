"use client";

import Image from "next/image";
import { useState } from 'react';

interface datatype {
    heading: string;
    imgSrc: string;
    paragraph: string;
}

const Aboutdata: datatype[] = [
    {
        heading: "Externalisation de la paie.",
        imgSrc: "/images/aboutus/imgOne.svg",
        paragraph: "La gestion de la paie peut être complexe et chronophage. Notre équipe d'experts en paie vous propose des solutions personnalisées pour simplifier et optimiser ce processus. De la gestion des salaires et des cotisations sociales à la production des bulletins de paie, nous prenons en charge tous les aspects liés à la paie de vos employés, vous permettant ainsi de gagner du temps et de réduire les risques d'erreurs.",
    },
    {
        heading: "Administration du personnel.",
        imgSrc: "/images/aboutus/imgTwo.svg",
        paragraph: "La gestion administrative du personnel peut être un véritable casse-tête pour les entreprises. Avec nos services d'administration du personnel, nous vous aidons à gérer efficacement tous les aspects liés à vos employés, y compris la gestion des contrats, des congés, des absences et des dossiers du personnel. Grâce à notre expertise, vous pouvez être sûr que vos processus administratifs sont gérés de manière professionnelle et conforme à la législation en vigueur.",
    },
    {
        heading: "Accompagnement à la création d'entreprise.",
        imgSrc: "/images/aboutus/imgThree.svg",
        paragraph: "Vous avez une idée d'entreprise mais ne savez pas par où commencer ? Notre équipe d'experts en création d'entreprise est là pour vous guider à chaque étape du processus. De la rédaction du business plan à la sélection du statut juridique le plus adapté, nous vous accompagnons dans la concrétisation de votre projet entrepreneurial. Notre objectif est de vous fournir les outils et les conseils nécessaires pour démarrer votre entreprise sur de bonnes bases et maximiser vos chances de succès.",
    },
]

const Aboutus = () => {
    const [expandedCard, setExpandedCard] = useState<number | null>(null);

    const toggleCard = (index: number) => {
        if (expandedCard === index) {
            setExpandedCard(null);
        } else {
            setExpandedCard(index);
        }
    };

    return (
        <div id="aboutus-section">
            <div className='mx-auto max-w-7xl px-4 py-24 my-32 lg:px-10 bg-lightgrey rounded-3xl relative'>
                <Image src="/images/aboutus/dots.svg" width={100} height={100} alt="dots-image" className="absolute bottom-1 -left-20" />
                <h3 className='text-center text-blue text-lg tracking-widest'>ABOUT US</h3>
                <h4 className='text-center text-4xl lg:text-65xl font-bold'>Know more about us.</h4>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-16 gap-x-16 lg:gap-x-32'>
                    {Aboutdata.map((item, index) => (
                        <div key={index} className='hover:bg-navyblue bg-white rounded-3xl mt-16 pt-10 pl-8 pb-10 pr-6 shadow-xl group transform transition duration-500 hover:scale-105'>
                            <h4 className='text-center text-3xl font-semibold text-black mb-5 group-hover:text-white'>{item.heading}</h4>
                            <Image src={item.imgSrc} alt={item.imgSrc} width={100} height={100} className="mb-5" />
                            <div>
                                <h4 className='text-lg font-normal text-black group-hover:text-white'>{item.paragraph}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Aboutus;