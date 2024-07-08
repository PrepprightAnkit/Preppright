import React from 'react';
import photography from './assets/photo.png';  // Import your image assets
import painting from './assets/painting.png';
import video from './assets/video.png';
import dev from './assets/dev.png';
import communication from './assets/communication.png';
import finance from './assets/finance.png';
import marketing from './assets/maketing.png';
import content from './assets/content.png';

const categories = [
  {
    png: photography,
    name: 'Photography',
    description: 'Capture the world through your lens.',
  },
  {
    png: painting,
    name: 'Painting',
    description: 'Express your creativity with colors.',
  },
  {
    png: video,
    name: 'Video',
    description: 'Create amazing videos.',
  },
  {
    png: dev,
    name: 'Development',
    description: 'Build amazing websites for public use.',
  },
  {
    png: communication,
    name: 'Communication',
    description: 'Talk like a pro.',
  },
  {
    png: finance,
    name: 'Finance',
    description: 'Manage your finances efficiently.',
  },
  {
    png: marketing,
    name: 'Marketing',
    description: 'Promote and sell products effectively.',
  },
  {
    png: content,
    name: 'Content Creation',
    description: 'Create engaging content.',
  },
  {
    png: communication,
    name: 'Communication',
    description: 'Talk like a pro.',
  },
  {
    png: finance,
    name: 'Finance',
    description: 'Manage your finances efficiently.',
  },
  {
    png: marketing,
    name: 'Marketing',
    description: 'Promote and sell products effectively.',
  },
  {
    png: content,
    name: 'Content Creation',
    description: 'Create engaging content.',
  },
];

const Categories = () => {
  return (
    <section className="bg-gray-100 min-h-screen p-8 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-blue-700 mb-8">Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center"
          >
            <img src={category.png} alt={category.name} className="h-16 w-16 mb-4" />
            <h3 className="text-xl font-semibold text-black mb-2">{category.name}</h3>
            <p className="text-black">{category.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
