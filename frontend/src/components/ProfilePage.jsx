import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../actions/authActions';
const ProfilePage = () => {
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const handleLogout = () => {
        dispatch(logout());
    };
    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 border-2 border-gray-300 rounded-lg text-center">
                    <h2 className="text-2xl font-bold mb-4">Please Login to View Your Profile</h2>
                    <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                        Go to Login
                    </Link>
                </div>
            </div>
        );
    }

    if (!user) {
        return <div className="text-blue-700">Loading...</div>;
    }

    return (
        <div className='flex flex-col'>

            <nav className="bg-white p-4">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                    <h1 className="text-2xl font-bold mb-2 md:mb-0">LOGO</h1>

                    <div className="scale-75 md:scale-100 flex space-x-3 text-2xl font-bold mb-2 md:mb-0">
                        <button onClick={() => navigate('/')} className="text-blue-800 hover:underline">Home</button>
                        <button onClick={() => navigate('/categories')} className="text-blue-800 hover:underline">Categories</button>
                        <button onClick={() => navigate('/allCourse')} className="text-blue-800 hover:underline">Courses</button>
                      
                    </div>

                    <div className="relative w-full border-4 md:w-1/4">
                        <h1 className='text-blue-800 text-3xl font-extrabold'>PROFILE PAGE!</h1>
                    </div>

                    <div className="flex space-x-4">
                        <>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-full"
                            >
                                Logout
                            </button>
                        </>
                    </div>
                </div>
            </nav>


            <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">

                <div className="bg-white rounded-lg border-4 border-blue-600 shadow-lg p-8 w-full md:w-2/3 lg:w-1/2">
                    <div className="flex flex-col items-center">
                        <img
                            src={user.profilePicture}
                            alt="Profile"
                            className="w-32 h-32 rounded-full border-4 border-blue-500 mb-4"
                        />
                        <h2 className="text-4xl font-bold text-blue-700 mb-2">{user.fullName}</h2>
                        {/* <p className="text-lg text-blue-600 mb-4">{user.email}</p>
                    <p className="text-lg text-blue-600 mb-4">{user.phoneNumber}</p> */}
                    </div>
                    <div className="space-y-4 text-2xl">
                        <div className="flex justify-between items-center ">
                            <span className="text-gray-700 font-bold">Email:</span>
                            <span className="text-green-700">{user.email}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-700 font-bold">Phone Number:</span>
                            <span className="text-green-700">{user.phoneNumber}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-700 font-bold">Role:</span>
                            <span className="text-green-700">{user.role}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-700 font-bold">Institution:</span>
                            <span className="text-green-700">{user.institution}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-700 font-bold">Year/Role:</span>
                            <span className="text-green-700">{user.yearOrRole}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-700 font-bold">Field/Department:</span>
                            <span className="text-green-700">{user.fieldOrDepartment}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-700 font-bold">Preferred Learning Mode:</span>
                            <span className="text-green-700">{user.preferredLearningMode}</span>
                        </div>
                        <div>
                            <span className="text-gray-700 font-bold">Course Categories:</span>
                            <ul className="list-disc list-inside text-green-700">
                                {user.courseCategories.map((category, index) => (
                                    <li key={index}>{category}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-700 font-bold">Preferred Contact Method:</span>
                            <span className="text-green-700">{user.preferredContactMethod}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
