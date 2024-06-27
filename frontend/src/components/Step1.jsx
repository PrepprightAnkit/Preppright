import React from 'react';
import studentImg from '../assets/student.jpg';
import professionalImg from '../assets/professional.jpg';
import managerImg from '../assets/manager.jpg';
import { Slide } from 'react-awesome-reveal';
const Step1 = ({ handleUserTypeSelection }) => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Slide>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">

          <div className="bg-white shadow-lg rounded-lg overflow-hidden scale-75">
            <img src={studentImg} alt="Student" className="w-full h-4/5 object-cover scale-75" />
            <button
              className="w-full h-1/5 bg-blue-700 text-white font-bold py-2 scale-75 text-5xl"
              onClick={() => handleUserTypeSelection('student')}
            >
              Student
            </button>
          </div>


          <div className="bg-white shadow-lg rounded-lg overflow-hidden scale-75">
            <img src={professionalImg} alt="Professional" className="w-full h-4/5 object-cover" />
            <button
              className="w-full h-1/5 bg-green-700 text-white font-bold py-2 scale-75 text-5xl"
              onClick={() => handleUserTypeSelection('professional')}
            >
              Professional
            </button>
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden scale-75">
            <img src={managerImg} alt="Manager" className="w-full h-4/5 object-cover" />
            <button
              className="w-full h-1/5 bg-black text-white font-bold py-2 scale-75 text-5xl"
              onClick={() => handleUserTypeSelection('manager')}
            >
              Manager
            </button>
          </div>
        </div>
      </Slide>
    </div >
  );
};

export default Step1;
