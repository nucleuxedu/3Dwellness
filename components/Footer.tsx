import { site } from "@/lib/siteContent";

const arrow = (
  <svg className="m-arrow" viewBox="0 0 12 12" aria-hidden="true">
    <path className="m-arrow__stem" d="M1 6h8" />
    <path className="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" />
  </svg>
);

export default function Footer() {
  return (
    <footer
      className="footer closing footer--visit"
      id="contact"
      aria-labelledby="close-h"
    >
      <div className="wrap">
        <div className="closing__cta close--type">
          <div className="section-head">
            <h2 id="close-h">Send a message</h2>
            <p className="t-lead">
              Write about the hub, a visit or support. We reply from St. Paul.
            </p>
          </div>
          <a className="btn btn--primary btn--xl" href="/#message">
            Send a message
            {arrow}
          </a>
        </div>
        <div className="closing__links">
          <div className="grid">
            <div className="span-6 stack-4">
              <address className="footer__address">{site.addressLine}</address>
              <p>
                <a
                  className="btn btn--secondary"
                  href={`https://www.openstreetmap.org/search?query=${site.mapQuery}`}
                >
                  Get directions
                </a>
              </p>
            </div>
            <div className="span-3 start-7 footer__col">
              <h3>Hub</h3>
              <ul>
                <li>
                  <a href="/#about">About</a>
                </li>
                <li>
                  <a href="/#spaces">Four spaces</a>
                </li>
                <li>
                  <a href="/#vision">Vision</a>
                </li>
              </ul>
            </div>
            <div className="span-3 footer__col">
              <h3>Contact</h3>
              <ul>
                <li>
                  <a href={`mailto:${site.email}`}>Write to us</a>
                </li>
                <li>
                  <a href="/#message">Open the form</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer__legal">
            <span>{site.copyright}</span>
            <span>Client photographs from 3dwellness.org</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
