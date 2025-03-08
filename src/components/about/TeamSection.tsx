'use client';

import TeamMember from './TeamMember';
import type { TeamMemberProps } from './TeamMember';

const teamData = [
  {
    name: 'Varad Joshi',
    role: 'Team Lead',
    imageSrc: '/images/team/placeholder.svg',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      email: 'varad@hhsheart.org'
    }
  },
  {
    name: 'Anushka Kedare',
    role: 'Frontend Developer',
    imageSrc: '/images/team/placeholder.svg',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com'
    }
  },
  {
    name: 'Manvith Karkera',
    role: 'Backend Developer',
    imageSrc: '/images/team/placeholder.svg',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com'
    }
  },
  {
    name: 'Delisha Duarte',
    role: 'UI/UX Designer',
    imageSrc: '/images/team/placeholder.svg',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com'
    }
  },
  {
    name: 'Komal Kanojiya',
    role: 'Full Stack Developer',
    imageSrc: '/images/team/placeholder.svg',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com'
    }
  },
  {
    name: 'Arjun Kharche',
    role: 'Database Engineer',
    imageSrc: '/images/team/placeholder.svg',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com'
    }
  },
  {
    name: 'Joshua Jimmy',
    role: 'Frontend Developer',
    imageSrc: '/images/team/placeholder.svg',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com'
    }
  },
  {
    name: 'Tuhin Jalui',
    role: 'Backend Developer',
    imageSrc: '/images/team/placeholder.svg',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com'
    }
  },
  {
    name: 'Vedank Kator',
    role: 'DevOps Engineer',
    imageSrc: '/images/team/placeholder.svg',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com'
    }
  },
  {
    name: 'Chrism Fernandes',
    role: 'Quality Assurance',
    imageSrc: '/images/team/placeholder.svg',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com'
    }
  },
  {
    name: 'Nethan Gonsalves',
    role: 'System Architect',
    imageSrc: '/images/team/placeholder.svg',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com'
    }
  }
];

export default function TeamSection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Our Team
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Meet the dedicated professionals behind HHS Heart, committed to making heart education accessible to everyone.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {teamData.map((member, index) => (
            <div 
              key={member.name} 
              className="fade-in" 
              style={{ 
                animationDelay: `${index * 150}ms`,
                opacity: 0
              }}
            >
              <TeamMember {...member} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 