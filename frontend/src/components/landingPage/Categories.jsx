import React, { useState, useEffect } from 'react';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/v1/users/cat',{
      method:'get'
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
      <h2 className="text-3xl font-bold text-blue-700 mb-8">Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center"
          >
            {category.imageUrl && (
              <img src={category.imageUrl} alt={category.name} className="h-16 w-16 mb-4" />
            )}
            <h3 className="text-xl font-semibold text-black mb-2">{category.name}</h3>
            <p className="text-black">{category.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
