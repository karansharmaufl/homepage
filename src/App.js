import './App.css';
import cv from './resources/file.pdf';
import userConfig from './resources/userConfig.json';

const handleDownload = () => {
  const link = document.createElement('a');
  link.href = cv;
  link.download = `karan_sharma_resume_${new Date().toISOString().slice(0, 10)}.pdf`;
  link.click();
};

function githubHandleFromUrl(url) {
  try {
    const path = new URL(url).pathname.replace(/^\/+|\/+$/g, '');
    return path.split('/')[0] || 'GitHub';
  } catch {
    return 'GitHub';
  }
}

function normalizeSkillGroups(config) {
  if (Array.isArray(config.skillGroups) && config.skillGroups.length > 0) {
    return config.skillGroups
      .map((g) => ({
        name: g.name,
        skills: Array.isArray(g.skills) ? g.skills.filter(Boolean) : [],
      }))
      .filter((g) => g.skills.length > 0);
  }
  const flat = Array.isArray(config.skills) ? config.skills.filter(Boolean) : [];
  if (flat.length === 0) return [];
  return [{ name: 'Technical skills', skills: flat }];
}

function formatLastUpdated() {
  return new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function fakeVisitorCount() {
  const base = 3847;
  const day = Math.floor(Date.now() / 86400000);
  return String(base + (day % 9000)).padStart(7, '0');
}

function App() {
  const config = userConfig;
  const {
    name,
    title,
    tagline,
    location,
    personalNote,
    blurb,
    beyondWork,
    email,
    linkedin,
    github,
    focusAreas,
    highlights,
  } = config;

  const githubHandle = githubHandleFromUrl(github);
  const focusItems = Array.isArray(focusAreas) ? focusAreas.filter(Boolean) : [];
  const skillGroups = normalizeSkillGroups(config);
  const workItems = Array.isArray(highlights) ? highlights : [];
  const interestItems = Array.isArray(beyondWork) ? beyondWork.filter(Boolean) : [];
  const lastUpdated = formatLastUpdated();
  const visitors = fakeVisitorCount();

  return (
    <div className="retro-page">
      <div className="retro-wrap">
        <div className="retro-banner">{name}'s Home Page</div>
        <div className="retro-subbanner">
          {title}
          {location ? ` · ${location}` : ''}
          {tagline ? ` — ${tagline}` : ''}
        </div>

        <div className="retro-status" role="presentation">
          Welcome. This page is occasionally updated.
        </div>

        <div className="retro-ticker-wrap" aria-hidden>
          <div className="retro-ticker">
            <span className="retro-ticker-inner">
              Software engineer · Distributed systems · Full stack · AI-driven applications ·
              permprocessing.fyi ·
            </span>
          </div>
        </div>

        <table className="retro-layout" cellPadding={0} cellSpacing={0} role="presentation">
          <tbody>
            <tr>
              <td className="retro-sidebar">
                <h2>Navigation</h2>
                <ul>
                  <li>
                    <a href="#about">About Me</a>
                  </li>
                  <li>
                    <a href="#experience">Experience</a>
                  </li>
                  <li>
                    <a href="#skills">Technical Skills</a>
                  </li>
                  {interestItems.length > 0 ? (
                    <li>
                      <a href="#beyond">Beyond Work</a>
                    </li>
                  ) : null}
                  <li>
                    <a href="#contact">Contact</a>
                  </li>
                </ul>

                <h2>Quick Links</h2>
                <ul>
                  <li>
                    <a href={`mailto:${email}`}>E-mail</a>
                  </li>
                  <li>
                    <a href={linkedin} target="_blank" rel="noopener noreferrer">
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a href={github} target="_blank" rel="noopener noreferrer">
                      GitHub
                    </a>
                  </li>
                  <li>
                    <button type="button" className="retro-btn" onClick={handleDownload}>
                      Résumé (.pdf)
                    </button>
                  </li>
                </ul>

                <p style={{ margin: '14px 0 6px', fontSize: '12px' }}>
                  <strong>Visitors:</strong>
                </p>
                <span className="retro-counter" aria-label={`Visitor count ${visitors}`}>
                  {visitors}
                </span>
                <p style={{ margin: '12px 0 0', fontSize: '11px', color: '#333' }}>
                  Last updated:
                  <br />
                  <em>{lastUpdated}</em>
                </p>
              </td>

              <td className="retro-main">
                <p className="retro-note">
                  Personal home page. Last revised {lastUpdated}.
                </p>

                <h2 id="about">About Me</h2>
                {personalNote ? <p>{personalNote}</p> : null}
                {blurb.split('\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}

                {focusItems.length > 0 ? (
                  <>
                    <hr className="retro-hr" />
                    <h2>Focus Areas</h2>
                    <div className="retro-box">
                      <ul className="retro-focus-list">
                        {focusItems.map((area) => (
                          <li key={area}>
                            <strong>{area}</strong>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : null}

                {workItems.length > 0 ? (
                  <>
                    <hr className="retro-hr" />
                    <h2 id="experience">Professional Experience</h2>
                    {workItems.map((item, index) => (
                      <div key={`${item.title}-${index}`}>
                        <h3>
                          {item.href ? (
                            <a href={item.href} target="_blank" rel="noopener noreferrer">
                              {item.title}
                            </a>
                          ) : (
                            item.title
                          )}
                          {item.context ? (
                            <>
                              {' '}
                              <span className="retro-tag">{item.context}</span>
                            </>
                          ) : null}
                        </h3>
                        <p>{item.description}</p>
                      </div>
                    ))}
                  </>
                ) : null}

                {skillGroups.length > 0 ? (
                  <>
                    <hr className="retro-hr" />
                    <h2 id="skills">Technical Skills</h2>
                    {skillGroups.map((group) => (
                      <div key={group.name} className="retro-box">
                        <p style={{ margin: '0 0 6px' }}>
                          <strong>
                            <u>{group.name}</u>
                          </strong>
                        </p>
                        <p style={{ margin: 0, fontFamily: 'Courier New, Courier, monospace', fontSize: '14px' }}>
                          {group.skills.join(' | ')}
                        </p>
                      </div>
                    ))}
                  </>
                ) : null}

                {interestItems.length > 0 ? (
                  <>
                    <hr className="retro-hr" />
                    <h2 id="beyond">Beyond Work</h2>
                    <ul>
                      {interestItems.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </>
                ) : null}

                <hr className="retro-hr" />
                <h2 id="contact">Contact Information</h2>
                <div className="retro-box">
                  <p style={{ margin: '0 0 8px' }}>
                    <strong>E-mail:</strong>{' '}
                    <a href={`mailto:${email}`}>{email}</a>
                  </p>
                  <p style={{ margin: '0 0 8px' }}>
                    <strong>LinkedIn:</strong>{' '}
                    <a href={linkedin} target="_blank" rel="noopener noreferrer">
                      {linkedin.replace(/^https?:\/\//, '')}
                    </a>
                  </p>
                  <p style={{ margin: 0 }}>
                    <strong>GitHub:</strong>{' '}
                    <a href={github} target="_blank" rel="noopener noreferrer">
                      github.com/{githubHandle}
                    </a>
                  </p>
                </div>

                <p align="center" style={{ fontSize: '14px', marginTop: '16px' }}>
                  <button type="button" className="retro-btn" onClick={handleDownload}>
                    Download résumé (PDF)
                  </button>
                </p>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="retro-footer">
          <p style={{ margin: '0 0 6px' }}>
            © {new Date().getFullYear()} {name}. This page is hosted on GitHub Pages.
          </p>
          <p style={{ margin: 0 }}>
            Built with React ·{' '}
            <a href={`mailto:${email}`}>Contact webmaster</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
