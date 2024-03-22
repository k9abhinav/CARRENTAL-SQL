import React from 'react';

const TeamMember = ({ name, position, bio, image }) => {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg bg-white mx-auto mb-8">
      <img className="w-full h-auto" src={image} alt={name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">{position}</p>
        <p className="text-gray-700 text-base mt-2">{bio}</p>
      </div>
    </div>
  );
};

const Team = () => {
  const teamMembers = [
    {
      name: 'Sreya Sreedharan',
      position: 'CEO & Founder',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: 'https://t3.ftcdn.net/jpg/06/36/69/86/360_F_636698674_DroChEj5eWmZiaZOSDMnj8hcDqqw74Fp.jpg',
    },
    {
      name: 'Krishna Ronaldo',
      position: 'CTO',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: 'https://t4.ftcdn.net/jpg/01/56/27/43/360_F_156274307_vvR5lO31LlIwtoFB1CC8jZtttlyQbK9M.jpg',
    },
    {
        name: 'John Datson',
        position: 'Head of Marketing',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        image: 'https://static.vecteezy.com/system/resources/thumbnails/028/287/529/small/indian-man-with-crossed-arms-wearing-a-formal-shirt-ai-generated-photo.jpg',
      },
      {
        name: 'Anu Jain',
        position: 'Customer Support Specialist',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYCazbJFSf4guI0BwHvbqzQm7FEz-xtfP6Bw&usqp=CAU',
      },
  ];

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Meet Our Team</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
