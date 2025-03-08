'use client';

import React from 'react';
import TeamMember, { TeamMemberProps } from './TeamMember';

// Placeholder team data - this will be replaced with actual team members later
const placeholderTeam: TeamMemberProps[] = [
  {
    name: 'Team Member 1',
    role: 'Project Lead',
    imageSrc: '/images/team/placeholder.jpg',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      email: 'example@example.com'
    }
  },
  {
    name: 'Team Member 2',
    role: 'Developer',
    imageSrc: '/images/team/placeholder.jpg',
  },
  {
    name: 'Team Member 3',
    role: 'Designer',
    imageSrc: '/images/team/placeholder.jpg',
  },
  {
    name: 'Team Member 4',
    role: 'Content Creator',
    imageSrc: '/images/team/placeholder.jpg',
  },
  {
    name: 'Team Member 5',
    role: 'Developer',
    imageSrc: '/images/team/placeholder.jpg',
  },
  {
    name: 'Team Member 6',
    role: 'Developer',
    imageSrc: '/images/team/placeholder.jpg',
  },
  {
    name: 'Team Member 7',
    role: 'Designer',
    imageSrc: '/images/team/placeholder.jpg',
  },
  {
    name: 'Team Member 8',
    role: 'Content Creator',
    imageSrc: '/images/team/placeholder.jpg',
  },
  {
    name: 'Team Member 9',
    role: 'Developer',
    imageSrc: '/images/team/placeholder.jpg',
  },
  {
    name: 'Team Member 10',
    role: 'Developer',
    imageSrc: '/images/team/placeholder.jpg',
  },
  {
    name: 'Team Member 11',
    role: 'Designer',
    imageSrc: '/images/team/placeholder.jpg',
  }
];

interface TeamSectionProps {
  teamMembers?: TeamMemberProps[];
}

const TeamSection: React.FC<TeamSectionProps> = ({ teamMembers = placeholderTeam }) => {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            The talented individuals behind the HHS Heart project, dedicated to creating an educational platform for heart anatomy and function.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <TeamMember
              key={index}
              name={member.name}
              role={member.role}
              imageSrc={member.imageSrc}
              socialLinks={member.socialLinks}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection; 