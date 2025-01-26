import { Search, X } from 'lucide-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchComponent = () => {
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const searchRef = useRef(null);
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/v1/users/courses`);
                if (response.ok) {
                    const data = await response.json();
                    setCourses(data || []);
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
                (course.tagline && course.tagline.toLowerCase().includes(searchString)) ||
                (course.aboutDescription && course.aboutDescription.toLowerCase().includes(searchString))
            );
        }).slice(0, 5);
    }, [courses, searchTerm]);

    const highlightMatch = (text, highlight) => {
        if (!highlight) return text;
        const parts = text.toLowerCase().split(highlight.toLowerCase());
        return parts.map((part, index) => (
            <React.Fragment key={index}>
                {part}
                {index < parts.length - 1 && (
                    <span className="bg-yellow-200 font-semibold">
                        {text.slice(part.length, part.length + highlight.length)}
                    </span>
                )}
            </React.Fragment>
        ));
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setIsOpen(value.length > 0);
    };

    const handleCourseSelect = (courseId) => {
        navigate(`/courses/${courseId}`);
        setSearchTerm('');
        setIsOpen(false);
    };

    const clearSearch = () => {
        setSearchTerm('');
        setIsOpen(false);
    };

    return (
        <div 
            ref={searchRef} 
            className="relative w-full max-w-md mx-auto px-10"
        >
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    onFocus={() => searchTerm.length > 0 && setIsOpen(true)}
                    placeholder="Search courses..."
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-full 
                               focus:outline-none focus:ring-2 focus:ring-blue-500 
                               transition-all duration-300"
                />
                {searchTerm && (
                    <button 
                        onClick={clearSearch}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                        <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    </button>
                )}
            </div>

            {isOpen && filteredCourses.length > 0 && (
                <div 
                    className="absolute z-50 w-full bg-white border border-gray-200 
                               rounded-lg shadow-lg mt-2 max-h-72 overflow-y-auto"
                >
                    {filteredCourses.map((course) => (
                        <div 
                            key={course._id}
                            onClick={() => handleCourseSelect(course._id)}
                            className="px-4 py-3 hover:bg-gray-100 cursor-pointer 
                                        flex items-center space-x-3 transition-colors"
                        >
                            <div>
                                <div className="font-semibold text-gray-800">
                                    {highlightMatch(course.title, searchTerm)}
                                </div>
                                {course.level && (
                                    <div className="text-sm text-gray-500">
                                        {highlightMatch(course.level, searchTerm)}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchComponent;