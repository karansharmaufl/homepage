import './App.css';
import cv from './resources/file.pdf';
import userConfig from './resources/userConfig.json';

const handleDownload = () => {
  const link = document.createElement('a');
  link.href = cv;
  link.download = `karan_sharma_resume_${new Date().toISOString().slice(0, 10)}.pdf`;
  link.click();
};

function initialsFromName(fullName) {
  return fullName
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 4);
}

function githubHandleFromUrl(url) {
  try {
    const path = new URL(url).pathname.replace(/^\/+|\/+$/g, '');
    return path.split('/')[0] || 'GitHub';
  } catch {
    return 'GitHub';
  }
}

function App() {
  const {
    name,
    title,
    blurb,
    marginalia,
    email,
    linkedin,
    github,
    skillsSectionTitle,
    skills,
    worksSectionTitle,
    highlightsIntro,
    highlights,
  } = userConfig;
  const initials = initialsFromName(name);
  const githubHandle = githubHandleFromUrl(github);
  const skillItems = Array.isArray(skills) ? skills.filter(Boolean) : [];
  const workItems = Array.isArray(highlights) ? highlights : [];
  const skillsHeading = skillsSectionTitle?.trim() || 'Technical skills';
  const workHeading = worksSectionTitle?.trim() || 'Experience';

  return (
    <div className="app-surface min-h-screen">
      <div className="mx-auto max-w-5xl px-5 pb-20 pt-14 sm:px-8 sm:pt-20 lg:px-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-10 xl:gap-x-14">
          <aside className="mb-12 border-l-[3px] border-rust pl-5 lg:col-span-4 lg:mb-0 lg:pl-6">
            <p
              className="font-serif text-[2.75rem] font-medium leading-none tracking-tight text-rust sm:text-5xl"
              aria-hidden
            >
              {initials}
            </p>
            {marginalia ? (
              <p className="mt-6 font-sans text-sm leading-relaxed text-ink-muted">{marginalia}</p>
            ) : null}
            <nav
              className={`space-y-3 font-sans text-sm ${marginalia ? 'mt-10' : 'mt-6'}`}
              aria-label="Contact and profiles"
            >
              <div>
                <a
                  href={`mailto:${email}`}
                  className="text-ink underline decoration-rust/35 decoration-1 underline-offset-[5px] transition hover:decoration-rust"
                >
                  {email}
                </a>
              </div>
              <div>
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink underline decoration-rust/35 decoration-1 underline-offset-[5px] transition hover:decoration-rust"
                >
                  LinkedIn
                </a>
              </div>
              <div>
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink underline decoration-rust/35 decoration-1 underline-offset-[5px] transition hover:decoration-rust"
                >
                  GitHub (@{githubHandle})
                </a>
              </div>
            </nav>
          </aside>

          <main className="lg:col-span-8">
            <h1 className="font-serif text-display font-semibold tracking-tight text-ink">{name}</h1>
            <p className="mt-2 font-sans text-lg font-medium text-ink-muted sm:text-xl">{title}</p>
            <div className="mt-8 max-w-2xl font-sans text-base leading-[1.75] text-ink-muted sm:text-[1.0625rem]">
              {blurb.split('\n').map((para, i) => (
                <p key={i} className={i > 0 ? 'mt-4' : ''}>
                  {para}
                </p>
              ))}
            </div>

            {skillItems.length > 0 ? (
              <section className="mt-14 max-w-2xl" aria-labelledby="skills-section-heading">
                <h2
                  id="skills-section-heading"
                  className="font-serif text-2xl font-semibold tracking-tight text-ink sm:text-[1.75rem]"
                >
                  {skillsHeading}
                </h2>
                <ul className="mt-6 flex list-none flex-wrap gap-2 p-0">
                  {skillItems.map((skill) => (
                    <li
                      key={skill}
                      className="border border-ink/15 bg-cream/60 px-3 py-1.5 font-sans text-sm text-ink"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {workItems.length > 0 ? (
              <section className="mt-14 max-w-2xl" aria-labelledby="work-section-heading">
                <h2
                  id="work-section-heading"
                  className="font-serif text-2xl font-semibold tracking-tight text-ink sm:text-[1.75rem]"
                >
                  {workHeading}
                </h2>
                {highlightsIntro ? (
                  <p className="mt-3 font-sans text-sm leading-relaxed text-ink-muted sm:text-[0.9375rem]">
                    {highlightsIntro}
                  </p>
                ) : null}
                <ul className="mt-10 list-none space-y-0 p-0">
                  {workItems.map((item, index) => (
                    <li
                      key={`${item.title}-${index}`}
                      className="border-t border-ink/10 py-9 first:border-t-0 first:pt-0 last:pb-0"
                    >
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3 className="font-serif text-xl font-semibold text-ink sm:text-[1.35rem]">
                          {item.href ? (
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-ink underline decoration-rust/40 decoration-1 underline-offset-[5px] transition hover:decoration-rust"
                            >
                              {item.title}
                            </a>
                          ) : (
                            item.title
                          )}
                        </h3>
                        {item.context ? (
                          <span className="font-sans text-xs font-semibold uppercase tracking-wider text-rust">
                            {item.context}
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-3 font-sans text-[0.9375rem] leading-relaxed text-ink-muted sm:text-base">
                        {item.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <div className="mt-12">
              <button
                type="button"
                onClick={handleDownload}
                className="border border-rust-deep bg-rust px-5 py-3 font-sans text-sm font-semibold tracking-wide text-cream transition hover:bg-rust-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-rust-deep focus-visible:ring-offset-2 focus-visible:ring-offset-parchment"
              >
                Download résumé (PDF)
              </button>
            </div>
          </main>
        </div>

        <footer className="mt-24 max-w-2xl border-t border-ink/10 pt-8 font-sans text-sm text-ink-muted">
          <p>
            © {new Date().getFullYear()} {name}. Static page on{' '}
            <a
              href="https://pages.github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline decoration-rust/30 underline-offset-[3px] hover:decoration-rust"
            >
              GitHub Pages
            </a>
            .
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
