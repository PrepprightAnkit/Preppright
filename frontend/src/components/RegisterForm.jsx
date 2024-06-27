import React, { useState, useContext } from 'react';
import Step1 from './Step1';
import Step2Student from './Step2Student';
import Step2Professional from './Step2Professional';
import Step2Manager from './Step2Manager';
import PhoneNumberContext from '../contexts/PhoneNumberContext';

const RegistrationForm = () => {
  const { phoneNumberG } = useContext(PhoneNumberContext); // Access phoneNumber from context

  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState('');

  const handleUserTypeSelection = (type) => {
    setUserType(type);
    setStep(step + 1);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className='flex flex-col items-center justify-center w-full '>
      <div id='navbar' className='bg-blue-700 flex flex-col items-center justify-center w-full text-white'>
        <h2 className='text-3xl font-bold p-2 m-2'>Registration Form</h2>
      </div>
      <p> Welcome to Prepright,<br/> {phoneNumberG}</p> 

      {step === 1 && <Step1 handleUserTypeSelection={handleUserTypeSelection} />}
      {step === 2 && userType === 'student' && <Step2Student nextStep={nextStep} prevStep={prevStep} />}
      {step === 2 && userType === 'professional' && <Step2Professional nextStep={nextStep} prevStep={prevStep} />}
      {step === 2 && userType === 'manager' && <Step2Manager nextStep={nextStep} prevStep={prevStep} />}
    </div>
  );
};

export default RegistrationForm;
