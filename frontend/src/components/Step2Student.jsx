import React, { useState } from 'react';

const Step2Student = ({ nextStep, prevStep }) => {
  const [college, setCollege] = useState('');
  const [course, setCourse] = useState('');
  const [degree, setDegree] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit data or move to the next step
    nextStep();
  };

  return (
    <div>
      <h2>Student Registration</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="College" value={college} onChange={(e) => setCollege(e.target.value)} />
        <input type="text" placeholder="Course" value={course} onChange={(e) => setCourse(e.target.value)} />
        <input type="text" placeholder="Degree" value={degree} onChange={(e) => setDegree(e.target.value)} />
        <button type="submit">Next</button>
        <button type="button" onClick={prevStep}>Back</button>
      </form>
    </div>
  );
};

export default Step2Student;
