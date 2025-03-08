'use client';

import React from 'react';
import TeamMember, { TeamMemberProps } from './TeamMember';
import AnimatedSection from '../common/AnimatedSection';

// Placeholder team data - replace with actual team data
const placeholderTeam: TeamMemberProps[] = [
  {
    name: 'Varad Joshi',
    imageSrc: '/images/team/placeholder.svg',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      email: 'varad@hhsheart.org'
    }
  },
  {
    name: 'Anushka Kedare',
    imageSrc: '/images/team/placeholder.svg',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      email: 'anushka@hhsheart.org'
    }
  },
  {
    name: 'Manvith Karkera',
    imageSrc: '/images/team/placeholder.svg',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      email: 'manvith@hhsheart.org'
    }
  },
  {
    name: 'Delisha Duarte',
    imageSrc: '/images/team/placeholder.svg',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com'
    }
  },
  {
    name: 'Komal Kanojiya',
    imageSrc: '/images/team/placeholder.svg',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      email: 'komal@hhsheart.org'
    }
  },
  {
    name: 'Arjun Kharche',
    imageSrc: '/images/team/placeholder.svg',
    socialLinks: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com'
    }
  },
  {
    name: 'Joshua Jimmy',
    imageSrc: '/images/team/placeholder.svg',
    socialLinks: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      email: 'joshua@hhsheart.org'
    }
  },
  {
    name: 'Tuhin Jalui',
    imageSrc: '/images/team/placeholder.svg',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com'
    }
  },
  {
    name: 'Vedank Kator',
    imageSrc: '/images/team/placeholder.svg',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com'
    }
  },
  {
    name: 'Chrism Fernandes',
    imageSrc: '/images/team/placeholder.svg',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      email: 'chrism@hhsheart.org'
    }
  },
  {
    name: 'Nethan Gonsalves',
    imageSrc: '/images/team/placeholder.svg',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      email: 'nethan@hhsheart.org'
    }
  }
];

interface TeamSectionProps {
  teamMembers?: TeamMemberProps[];
}

const TeamSection: React.FC<TeamSectionProps> = ({ teamMembers = placeholderTeam }) => {
  return (
    <section id="team-section" className="py-20 bg-white dark:bg-gray-900 scroll-mt-20">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="slideUp" className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Our Team
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Meet the dedicated professionals behind HHS Heart, committed to making heart education accessible to everyone.
          </p>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {teamMembers.map((member, index) => (
            <AnimatedSection 
              key={index} 
              animation="fadeIn" 
              delay={index * 150}
            >
              <TeamMember 
                name={member.name}
                imageSrc={member.imageSrc}
                socialLinks={member.socialLinks}
              />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection; 