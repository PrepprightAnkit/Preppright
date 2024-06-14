import React, { useState } from 'react';
import Step1 from './Step1';
import Step2Student from './Step2Student';
import Step2Professional from './Step2Professional';
import Step2Manager from './Step2Manager';

const RegistrationForm = () => {
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

  switch (step) {
    case 1:
      return <Step1 handleUserTypeSelection={handleUserTypeSelection} />;
    case 2:
      switch (userType) {
        case 'student':
          return <Step2Student nextStep={nextStep} prevStep={prevStep} />;
        case 'professional':
          return <Step2Professional nextStep={nextStep} prevStep={prevStep} />;
        case 'manager':
          return <Step2Manager nextStep={nextStep} prevStep={prevStep} />;
        default:
          return null;
      }
    default:
      return null;
  }
};

export default RegistrationForm;
