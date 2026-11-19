import { assets, site } from "@/lib/siteContent";

const chevron = (
  <svg className="chev" viewBox="0 0 12 12" aria-hidden="true">
    <path
      d="M3 4.5l3 3 3-3"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Header() {
  return (
    <header className="nav">
      <div className="wrap nav__bar">
        <a className="skip-link" href="#top">
          Skip to content
        </a>
        <a className="nav__logo" href="/#top">
          <span className="mark mark--initial" aria-hidden="true">
            3
          </span>
          {site.name}
        </a>
        <nav className="nav__links" aria-label="Main">
          <div className="nav__item">
            <a className="nav__link" href="/#spaces">
              Spaces {chevron}
            </a>
            <div className="nav__menu">
              <div className="wrap grid">
                <div className="menu-col span-3">
                  <p className="t-label">Care and immersion</p>
                  <a href="/#spaces">
                    Healing Hub
                    <span>Basement restorative care</span>
                  </a>
                  <a href="/#spaces">
                    Immersion Lab
                    <span>AI, AR and VR exhibits</span>
                  </a>
                </div>
                <div className="menu-col span-3">
                  <p className="t-label">Learning and gathering</p>
                  <a href="/#spaces">
                    Technology School
                    <span>Training for youth and adults</span>
                  </a>
                  <a href="/#spaces">
                    Community Commons
                    <span>Kitchen, events, greenhouse</span>
                  </a>
                </div>
                <a className="menu-card span-3 start-10" href="/#spaces">
                  <div className="panel">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="frame__img"
                      src={assets.immersionLab}
                      alt="5D Wellness Immersion Lab render"
                    />
                  </div>
                  <span className="t-card">Four planned spaces</span>
                  <span className="t-small muted">Downtown St. Paul hub</span>
                </a>
              </div>
            </div>
          </div>
          <div className="nav__item">
            <a className="nav__link" href="/#about">
              About
            </a>
          </div>
          <div className="nav__item">
            <a className="nav__link" href="/#vision">
              Vision
            </a>
          </div>
          <div className="nav__item">
            <a className="nav__link" href="/#message">
              Contact
            </a>
          </div>
        </nav>
        <div className="nav__actions">
          <a className="btn btn--primary" href="/#message">
            Send a message
          </a>
        </div>
        <button
          className="nav__toggle"
          type="button"
          aria-expanded="false"
          aria-label="Menu"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            aria-hidden="true"
          >
            <path
              d="M2 5h14M2 13h14"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
