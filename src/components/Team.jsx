import React, { useMemo } from 'react';
import rawMembers from '../data/teamMembers.json';
import { getProcessedMembers, DEFAULT_AVATAR } from '../utils/memberUtils';

export default function Team() {
  // Process members and sort according to the exact display priority order
  const allMembers = useMemo(() => getProcessedMembers(rawMembers), []);

  return (
    <section className="team-section" id="team">
      <div className="title-card reveal-on-scroll">
        <div className="text-content">
          <h2>Our Team</h2>
          <p>
            Meet the passionate core organizers, technical leads, and innovators
            behind Google Developer Group on Campus GIET University.
          </p>
        </div>
        <div className="dude"></div>
      </div>

      {/* Team Cards Grid */}
      <div className="team-cards">
        {allMembers.map((member, idx) => (
          <div
            key={member.id}
            className={`team-card tc${(idx % 8) + 1} reveal-on-scroll reveal-delay-${(idx % 3) + 1}`}
          >
            <div className="profile-pic">
              <img
                src={member.avatarUrl || DEFAULT_AVATAR}
                alt={`${member.name} - ${member.displayRole}`}
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = DEFAULT_AVATAR;
                }}
              />
            </div>
            <div className="ppl-det">
              <h3 title={member.name}>{member.name}</h3>
              <p className="role-tag" title={member.displayRole}>
                {member.displayRole}
              </p>
              <div className="social-icons">
                {member.githubUrl && (
                  <a
                    href={member.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name}'s GitHub Profile`}
                    title="GitHub"
                  >
                    <i className="fa-brands fa-github"></i>
                  </a>
                )}
                {member.linkedinUrl && (
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name}'s LinkedIn Profile`}
                    title="LinkedIn"
                  >
                    <i className="fa-brands fa-linkedin-in"></i>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
