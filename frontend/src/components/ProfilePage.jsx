import React, { useEffect, useState } from 'react';

const ProfilePage = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [error, setError] = useState(null);

   
    useEffect(() => {
        fetchCourses();
      }, []);
    
      const fetchCourses = async () => {
        try {
          const response = await fetch('http://localhost:8000/api/v1/users/current-user');
          if (response.ok) {
            const data = await response.json();
            setUserDetails(data.data);
          } else {
            console.error('Failed to fetch courses');
          }
        } catch (error) {
          console.error('Error fetching courses:', error);
        }
      };

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (!userDetails) {
        return <div className="text-blue-700">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full md:w-2/3 lg:w-1/2">
                <div className="flex flex-col items-center">
                    <img
                        src={userDetails.profilePicture}
                        alt="Profile"
                        className="w-32 h-32 rounded-full border-4 border-blue-500 mb-4"
                    />
                    <h2 className="text-3xl font-bold text-blue-700 mb-2">{userDetails.fullName}</h2>
                    <p className="text-lg text-blue-600 mb-4">{userDetails.email}</p>
                    <p className="text-lg text-blue-600 mb-4">{userDetails.phoneNumber}</p>
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-semibold">Role:</span>
                        <span className="text-green-700">{userDetails.role}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-semibold">Institution:</span>
                        <span className="text-green-700">{userDetails.institution}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-semibold">Year/Role:</span>
                        <span className="text-green-700">{userDetails.yearOrRole}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-semibold">Field/Department:</span>
                        <span className="text-green-700">{userDetails.fieldOrDepartment}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-semibold">Preferred Learning Mode:</span>
                        <span className="text-green-700">{userDetails.preferredLearningMode}</span>
                    </div>
                    <div>
                        <span className="text-gray-700 font-semibold">Course Categories:</span>
                        <ul className="list-disc list-inside text-green-700">
                            {userDetails.courseCategories.map((category, index) => (
                                <li key={index}>{category}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-semibold">Preferred Contact Method:</span>
                        <span className="text-green-700">{userDetails.preferredContactMethod}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
