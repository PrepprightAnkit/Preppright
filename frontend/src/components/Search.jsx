import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchComponent = () => {
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/v1/users/courses`);
                if (response.ok) {
                    const data = await response.json();
                    setCourses(data.data || []);
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, [apiUrl]);

    const filteredCourses = useMemo(() => {
        if (!searchTerm.trim()) return [];

        return courses.filter(course => {
            const searchString = searchTerm.toLowerCase();
            return (
                (course.title && course.title.toLowerCase().includes(searchString)) ||
                (course.description && course.description.toLowerCase().includes(searchString)) ||
                (course.level && course.level.toLowerCase().includes(searchString))
            );
        }).slice(0, 5);
    }, [courses, searchTerm]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleCourseSelect = (courseId) => {
        navigate(`/courses/${courseId}`);
        setSearchTerm('');
    };

    return (
        <div className="relative w-full">
            <div className="relative">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Search courses..."
                    className="w-full px-4 py-2 border rounded-full"
                />
            </div>

            {searchTerm && filteredCourses.length > 0 && (
                <div className="absolute z-50 w-full bg-white border rounded-lg shadow-lg mt-1">
                    {filteredCourses.map((course) => (
                        <div 
                            key={course._id}
                            onClick={() => handleCourseSelect(course._id)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                            {course.title}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchComponent;