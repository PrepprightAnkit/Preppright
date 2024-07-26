import React from "react";
import p1 from "./assets/p1.png";
import p2 from "./assets/p2.png";
import p3 from "./assets/p3.png";
import { Fade } from "react-awesome-reveal";
const Platform = () => {
    return (
        <div className="min-h-screen bg-white p-6"><Fade cascade>
            <header className="text-center mb-12">

                <h1 className="text-5xl font-bold text-black">
                    All-In-One <span className="text-blue-700"> Learning Platform</span>
                    <br></br>
                </h1>
                <p className="text-gray-600 mt-4 text-3xl">
                    Skilline is one powerful online software suite that combines all the
                    tools needed to run a successful school or office.
                </p>
            </header>

            <div className="flex flex-col lg:flex-row justify-center items-center lg:space-x-6">
                <div className="card bg-white shadow-md rounded-lg overflow-hidden mb-6 lg:mb-0 transform hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center justify-center w-full h-64">
                        <img src={p3} alt="Online Billing" className="object-contain h-full" />
                    </div>
                    <div className="p-6 text-center">
                        <h2 className="text-3xl font-bold text-blue-700 mb-2">
                            Online Billing, Invoicing, & Contracts
                        </h2>
                        <p className="text-gray-600 text-xl">
                            Simple and secure control of your organization’s financial and
                            legal transactions. Send customized invoices and contracts.
                        </p>
                    </div>
                </div>
                <div className="card bg-white shadow-md rounded-lg overflow-hidden mb-6 lg:mb-0 transform hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center justify-center w-full h-64">
                        <img src={p2} alt="Online Billing" className="object-contain h-full" />
                    </div>
                    <div className="p-6 text-center">
                        <h2 className="text-3xl font-bold text-blue-700 mb-2">
                            Online Billing, Invoicing, & Contracts
                        </h2>
                        <p className="text-gray-600 text-xl">
                            Simple and secure control of your organization’s financial and
                            legal transactions. Send customized invoices and contracts.
                        </p>
                    </div>
                </div>
                <div className="card bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center justify-center w-full h-64">
                        <img src={p3} alt="Online Billing" className="object-contain h-full" />
                    </div>
                    <div className="p-6 text-center">
                        <h2 className="text-3xl font-bold text-blue-700 mb-2">
                            Online Billing, Invoicing, & Contracts
                        </h2>
                        <p className="text-gray-600 text-xl">
                            Simple and secure control of your organization’s financial and
                            legal transactions. Send customized invoices and contracts.
                        </p>
                    </div>
                </div>

            </div>
        </Fade>
        </div>
    );
};

export default Platform;
