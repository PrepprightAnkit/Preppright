import axios from 'axios';
import React, { useEffect, useState } from 'react';

const UploadCourse = () => {
  const [categories, setCategories] = useState([]);
  // About Course Section State
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [aboutSection, setAboutSection] = useState({
    aboutTitle: '',
    aboutDescription: '',
    aboutImgUrl: ''
  });

  // Main Course Details State
  const [courseDetails, setCourseDetails] = useState({
    title: '',
    tagline: '',
    courseType: '',
    totalCourseFee: '',
    duration: 0,
    placementAssistance: true,
    projectCount: 0,
    rating: 0
  });

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/v1/users/cat`);
        console.log(response.data.data)
        setCategories(response.data.data); // Assuming the response is an array
      } catch (error) {
        console.error('Error fetching categories:', error);
        alert('Failed to load categories. Please try again later.');
      }
    };

    fetchCategories();
  }, [apiUrl]);

  // Syllabus State
  const [syllabus, setSyllabus] = useState([
    {
      title: '',
      modules: [{ name: '', description: '' }]
    }
  ]);

  // Instructors State
  const [instructors, setInstructors] = useState([
    { name: '', role: '', bio: '', image: '' }
  ]);

  // Reviews State
  const [reviews, setReviews] = useState([
    { 
      name: '', 
      role: '', 
      text: '', 
      rating: 5, 
      image: '' 
    }
  ]);

  // Generic handler for course details
  const handleCourseDetailsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCourseDetails(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
              type === 'number' ? Number(value) : value
    }));
  };

  // Handler for about section
  const handleAboutSectionChange = (e) => {
    const { name, value } = e.target;
    setAboutSection(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Dynamic section management helpers
  const addSection = (setter, defaultItem) => {
    setter(prev => [...prev, defaultItem]);
  };

  const removeSection = (setter, index) => {
    setter(prev => prev.filter((_, i) => i !== index));
  };

  const updateSection = (setter, index, updates) => {
    setter(prev => 
      prev.map((item, i) => 
        i === index ? { ...item, ...updates } : item
      )
    );
  };

  
  
  // Submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const courseData = {
        ...courseDetails,
        ...aboutSection,
        syllabus,
        instructors,
        reviews
      };

      const response = await axios.post(`${apiUrl}/api/v1/users/courses`, courseData);
      // In your course creation route
      console.log('Received Course Data:', response);
      alert('Course uploaded successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading course:', error);
      alert('Failed to upload course. Please check your inputs.');
    }
  };

  return (
    <div className="container mx-auto p-8 bg-gray-50">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Upload New Course
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-12">
        {/* Course Basic Details */}
        <div className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">
            Course Details
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              name="title"
              value={courseDetails.title}
              onChange={handleCourseDetailsChange}
              placeholder="Course Title"
              className="w-full p-3 border rounded-lg"
              required
            />
            <input
              type="text"
              name="tagline"
              value={courseDetails.tagline}
              onChange={handleCourseDetailsChange}
              placeholder="Course Tagline"
              className="w-full p-3 border rounded-lg"
              required
            />
            <input
              type="number"
              name="totalCourseFee"
              value={courseDetails.totalCourseFee}
              onChange={handleCourseDetailsChange}
              placeholder="Total Course Fee"
              className="w-full p-3 border rounded-lg"
              required
            />
            <select
  name="courseType"
  value={courseDetails.courseType}
  onChange={handleCourseDetailsChange}
  className="w-full p-3 border rounded-lg"
  required
>
  <option value="" disabled>
    Select Course Type
  </option>
  {categories.map((category) => (
    <option key={category._id} value={category.title}>
      {category.title}
    </option>
  ))}
</select>

            <input
              type="number"
              name="rating"
              
              onChange={handleCourseDetailsChange}
              placeholder="rating"
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="number"
              name="projectCount"
              
              onChange={handleCourseDetailsChange}
              placeholder="Number of Projects"
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="number"
              name="duration"
              onChange={handleCourseDetailsChange}
              placeholder="Course Duration (Months)"
              className="w-full p-3 border rounded-lg"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                name="placementAssistance"
                checked={courseDetails.placementAssistance}
                onChange={handleCourseDetailsChange}
                className="mr-2"
              />
              <label>Placement Assistance</label>
            </div>
          </div>
        </div>

        {/* About Course Section */}
        <div className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">
            About Course
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              name="aboutTitle"
              value={aboutSection.aboutTitle}
              onChange={handleAboutSectionChange}
              placeholder="About Title"
              className="w-full p-3 border rounded-lg"
              required
            />
            <input
              type="text"
              name="aboutImgUrl"
              value={aboutSection.aboutImgUrl}
              onChange={handleAboutSectionChange}
              placeholder="About Image URL"
              className="w-full p-3 border rounded-lg"
              required
            />
            <textarea
              name="aboutDescription"
              value={aboutSection.aboutDescription}
              onChange={handleAboutSectionChange}
              placeholder="About Description"
              className="w-full p-3 border rounded-lg col-span-2"
              rows="4"
              required
            />
          </div>
        </div>

        {/* Syllabus Section */}
        <div className="bg-white shadow-md rounded-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-700">
              Course Syllabus
            </h2>
            <button 
              type="button"
              onClick={() => addSection(setSyllabus, {
                title: '', 
                modules: [{ name: '', description: '' }]
              })}
              className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
            >
              +
            </button>
          </div>

          {syllabus.map((section, sectionIndex) => (
            <div 
              key={sectionIndex} 
              className="border p-4 rounded-lg mb-4 relative"
            >
              <button
                type="button"
                onClick={() => removeSection(setSyllabus, sectionIndex)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-600"
              >
                X
              </button>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) => updateSection(
                    setSyllabus, 
                    sectionIndex, 
                    { title: e.target.value }
                  )}
                  placeholder="Section Title"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              {/* Modules Management */}
              <div>
                <h3 className="text-lg font-medium mb-2">Modules</h3>
                {section.modules.map((module, moduleIndex) => (
                  <div 
                    key={moduleIndex} 
                    className="flex gap-2 mb-2"
                  >
                    <input
                      type="text"
                      value={module.name}
                      onChange={(e) => {
                        const updatedModules = [...section.modules];
                        updatedModules[moduleIndex].name = e.target.value;
                        updateSection(setSyllabus, sectionIndex, { 
                          modules: updatedModules 
                        });
                      }}
                      placeholder="Module Name"
                      className="w-1/2 p-2 border rounded"
                      required
                    />
                    <input
                      type="text"
                      value={module.description}
                      onChange={(e) => {
                        const updatedModules = [...section.modules];
                        updatedModules[moduleIndex].description = e.target.value;
                        updateSection(setSyllabus, sectionIndex, { 
                          modules: updatedModules 
                        });
                      }}
                      placeholder="Module Description"
                      className="w-1/2 p-2 border rounded"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updatedModules = section.modules.filter((_, i) => i !== moduleIndex);
                        updateSection(setSyllabus, sectionIndex, { modules: updatedModules });
                      }}
                      className="text-red-500"
                    >
                      X
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const updatedModules = [...section.modules, { name: '', description: '' }];
                    updateSection(setSyllabus, sectionIndex, { modules: updatedModules });
                  }}
                  className="bg-green-500 text-white p-2 rounded mt-2"
                >
                  Add Module
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Instructors Section */}
        <div className="bg-white shadow-md rounded-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-700">
              Course Instructors
            </h2>
            <button 
              type="button"
              onClick={() => addSection(setInstructors, {
                name: '', 
                role: '', 
                bio: '', 
                image: '' 
              })}
              className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
            >
              +
            </button>
          </div>

          {instructors.map((instructor, index) => (
            <div 
              key={index} 
              className="border p-4 rounded-lg mb-4 relative"
            >
              <button
                type="button"
                onClick={() => removeSection(setInstructors, index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-600"
              >
                X
              </button>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={instructor.name}
                  onChange={(e) => updateSection(
                    setInstructors, 
                    index, 
                    { name: e.target.value }
                  )}
                  placeholder="Instructor Name"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  value={instructor.role}
                  onChange={(e) => updateSection(
                    setInstructors, 
                    index, 
                    { role: e.target.value }
                  )}
                  placeholder="Role"
                  className="w-full p-2 border rounded"
                  required
                />
                <textarea
                  value={instructor.bio}
                  onChange={(e) => updateSection(
                    setInstructors, 
                    index, 
                    { bio: e.target.value }
                  )}
                  placeholder="Instructor Bio"
                  className="w-full p-2 border rounded col-span-2"
                  rows="3"
                  required
                />
                <input
                  type="text"
                  value={instructor.image}
                  onChange={(e) => updateSection(
                    setInstructors, 
                    index, 
                    { image: e.target.value }
                  )}
                  placeholder="Image URL"
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Reviews Section */}
        <div className="bg-white shadow-md rounded-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-700">
              Course Reviews
            </h2>
            <button 
              type="button"
              onClick={() => addSection(setReviews, {
                name: '', 
                role: '', 
                text: '', 
                rating: 5, 
                image: '' 
              })}
              className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
            >
              +
            </button>
          </div>

          {reviews.map((review, index) => (
            <div 
              key={index} 
              className="border p-4 rounded-lg mb-4 relative"
            >
              <button
                type="button"
                onClick={() => removeSection(setReviews, index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-600"
              >
                X
              </button>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={review.name}
                  onChange={(e) => updateSection(
                    setReviews, 
                    index, 
                    { name: e.target.value }
                  )}
                  placeholder="Reviewer Name"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  value={review.role}
                  onChange={(e) => updateSection(
                    setReviews, 
                    index, 
                    { role: e.target.value }
                  )}
                  placeholder="Reviewer Role"
                  className="w-full p-2 border rounded"
                  required
                />
                <textarea
                  value={review.text}
                  onChange={(e) => updateSection(setReviews, 
                    index, 
                    { text: e.target.value }
                  )}
                  placeholder="Review Text"
                  className="w-full p-2 border rounded col-span-2"
                  rows="3"
                  required
                />
                <div className="flex items-center">
                  <label className="mr-2">Rating:</label>
                  <select
                    value={review.rating}
                    onChange={(e) => updateSection(
                      setReviews, 
                      index, 
                      { rating: Number(e.target.value) }
                    )}
                    className="w-full p-2 border rounded"
                  >
                    {[1, 2, 3, 4, 5].map(rating => (
                      <option key={rating} value={rating}>{rating}</option>
                    ))}
                  </select>
                </div>
                <input
                  type="text"
                  value={review.image}
                  onChange={(e) => updateSection(
                    setReviews, 
                    index, 
                    { image: e.target.value }
                  )}
                  placeholder="Reviewer Image URL"
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-12 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Upload Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadCourse;