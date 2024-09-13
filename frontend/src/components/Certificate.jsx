import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Certificate = () => {
    const [users, setUsers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [certificates, setCertificates] = useState([]);
    const navigate = useNavigate();
    const {isAuthenticated} =  useSelector((state) => state.auth);
    useEffect(() => {
       

        const fetchData = async () => {
            try {
                const usersResponse = await fetch('http://localhost:8000/api/v1/users/getAllUsers');
                const usersData = await usersResponse.json();

                const coursesResponse = await fetch('http://localhost:8000/api/v1/users/courses');
                const coursesData = await coursesResponse.json();

                // Filter and process certificates
                const filteredCertificates = processCertificates(usersData.data, coursesData.data);
                setUsers(usersData.data);
                setCourses(coursesData.data);
                setCertificates(filteredCertificates);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const processCertificates = (users, courses) => {
        const certificates = [];

        users.forEach(user => {
            user.coursesTaken.forEach(course => {
                if (course.progress === 100) {
                    const courseDetail = courses.find(c => c._id === course.course);
                    if (courseDetail) {
                        certificates.push({
                            userName: user.fullName,
                            email: user.email,
                            courseName: courseDetail.title,
                            id: `${user._id}-${course._id}`  // Unique identifier for each certificate
                        });
                    }
                }
            });
        });

        return certificates;
    };

    const handleGenerateCertificate = (userName, email, courseName) => {
        // Handle certificate generation logic here
        alert(`Generating certificate for ${userName} (${email}) - Course: ${courseName}`);
    };


    return (
        <div className="container mx-auto p-4  min-h-screen">
            <nav className="bg-white p-4 border-b border-gray-200">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                    <h1 className="text-2xl font-bold mb-2 md:mb-0">LOGO</h1>
                    <div className="scale-75 md:scale-100 flex space-x-4 text-2xl font-bold mb-2 md:mb-0">
                        <button onClick={() => navigate('/')} className="text-blue-800 hover:underline">Home</button>
                        <button onClick={() => navigate('/allCat')} className="text-blue-800 hover:underline">Categories</button>
                        <button onClick={() => navigate('/allCourse')} className="text-blue-800 hover:underline">Courses</button>
                    </div>

                    <div className="flex space-x-4">
                        {isAuthenticated ? (
                            <>
                                <button className="bg-blue-500 hover:bg-green-900 text-white px-4 py-2 rounded-full">
                                    <Link to="/userProfile">My Profile</Link>
                                </button>
                            </>
                        ) : (
                            <>
                                <button className="bg-blue-500 hover:bg-blue-900 text-white px-4 py-2 rounded-full">
                                    <Link to="/login">Login</Link>
                                </button>
                                <button className="bg-green-500 hover:bg-green-900 text-white px-4 py-2 rounded-full">
                                    <Link to="/reg">Register</Link>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </nav>
            <h1 className="text-3xl font-bold text-blue-700 mb-4">Certificates</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {certificates.map((cert, index) => (
                    <div key={index} className="p-4 bg-white shadow-md rounded-lg border border-gray-200">
                        <h2 className="text-xl font-semibold text-green-700 mb-2">Course Completion</h2>
                        <p className="text-lg text-blue-600">Name: {cert.userName}</p>
                        <p className="text-lg text-blue-600">Email: {cert.email}</p>
                        <p className="text-lg">Course: {cert.courseName}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Certificate;
