import React from 'react';

const teamMembers = [
  {
    id: 1,
    img: '/lead.png',
    name: 'NAME',
    subname: 'SUBNAME',
    role: 'Lead',
  },
  {
    id: 2,
    img: '/co-lead.jpg',
    name: 'NAME',
    subname: 'SUBNAME',
    role: 'Co - Organiser',
  },
  {
    id: 3,
    img: '/mentor.jpeg',
    name: 'NAME',
    subname: 'SUBNAME',
    role: 'Mentor',
  },
  {
    id: 4,
    img: '/me.jpg',
    name: 'NAME',
    subname: 'SUBNAME',
    role: 'UX/UI Lead',
  },
  {
    id: 5,
    img: '/creative.jpg',
    name: 'NAME',
    subname: 'SUBNAME',
    role: 'Web-Dev Lead',
  },
  {
    id: 6,
    img: '/sexnik.jpg',
    name: 'NAME',
    subname: 'SUBNAME',
    role: 'Creative Lead',
  },
  {
    id: 7,
    img: '/ai.jpg',
    name: 'NAME',
    subname: 'SUBNAME',
    role: 'AIML Lead',
  },
  {
    id: 8,
    img: '/android.gif',
    name: 'NAME',
    subname: 'SUBNAME',
    role: 'Android Lead',
  },
];

export default function Team() {
  return (
    <section className="team-section" id="team">
      <div className="title-card">
        <div className="text-content">
          <h2>Our Team</h2>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
            ab illo inventore veritatis et quasi architecto beatae vitae dicta
            sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit.
          </p>
        </div>
        <div className="dude"></div>
      </div>

      <div className="team-cards">
        {teamMembers.map((member, idx) => (
          <div key={member.id} className={`team-card tc${idx + 1}`}>
            <div className="profile-pic">
              <img src={member.img} alt={`${member.name} - ${member.role}`} />
            </div>
            <div className="ppl-det">
              <h3>{member.name}</h3>
              <h3>{member.subname}</h3>
              <p>{member.role}</p>
              <div className="social-icons">
                <a href="#" aria-label="LinkedIn">
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
                <a href="#" aria-label="X Twitter">
                  <i className="fa-brands fa-x-twitter"></i>
                </a>
                <a href="#" aria-label="Instagram">
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
