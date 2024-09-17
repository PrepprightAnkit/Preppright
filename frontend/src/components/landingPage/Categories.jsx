import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Slide, Zoom, Fade } from 'react-awesome-reveal';
const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    fetch(`${apiUrl}/api/v1/users/cat`, {
      method: 'get'
    })
      .then(response => response.json())
      .then(data => {
        const mappedCategories = data.data.map(category => ({
          imageUrl: category.image,
          name: category.title,
          description: category.description,
        }));
        setCategories(mappedCategories);
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  return (
    <section className="bg-gray-100 min-h-screen p-8 flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-8">
        <Slide>
          <div className='flex flex-col'>
            <h2 className=" text-2xl md:text-5xl font-bold text-blue-700">TOP CATEGORIES</h2>
            <h2 className="md:text-2xl  ml-2 mt-2 font-light text-gray-800"> Explore our Top Categories</h2>

          </div>
          <Link to="/allCat">
            <button className="bg-blue-700 text-white md:px-4 py-2 rounded-md hover:bg-blue-800">
              View All Categories
            </button>
          </Link>
        </Slide>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">


        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-white border-4 border-blue-700 shadow-md rounded-lg hover:scale-110 p-4 flex flex-col items-center text-center"
          >
            <Fade cascade>
              {category.imageUrl && (
                <img src={category.imageUrl} alt={category.name} className="h-16 w-auto mb-4" />
              )}
              <h3 className="text-3xl font-bold text-blue-700 mb-2">{category.name}</h3>
              <p className="text-black text-xl">{category.description}</p>
            </Fade>
          </div>
        ))}


      </div>
    </section >
  );
};

export default Categories;
