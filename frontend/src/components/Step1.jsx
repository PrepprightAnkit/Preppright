import React from 'react';

const Step1 = ({ handleUserTypeSelection }) => {
  return (
    <div>
      <h2>Are you a student, professional, or manager?</h2>
      <button onClick={() => handleUserTypeSelection('student')}>Student</button>
      <button onClick={() => handleUserTypeSelection('professional')}>Professional</button>
      <button onClick={() => handleUserTypeSelection('manager')}>Manager</button>
    </div>
  );
};

export default Step1;
