import { assets, plans, site } from "@/lib/siteContent";

const arrow = (
  <svg className="m-arrow" viewBox="0 0 12 12" aria-hidden="true">
    <path className="m-arrow__stem" d="M1 6h8" />
    <path className="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" />
  </svg>
);

export default function HomePage() {
  return (
    <>
      {/* hero split · use · 1 screen · photo: image-1 */}
      <section
        className="hero hero--split"
        data-enter=""
        aria-labelledby="hero-h"
      >
        <div className="wrap">
          <div className="hero-text grid hero__grid">
            <div className="hero__text span-5">
              <p className="hero__kicker">
                <span className="dot" aria-hidden="true" />
                Planned for downtown St. Paul
              </p>
              <h1 id="hero-h">Wellness hub for downtown St. Paul</h1>
              <p className="hero__lead">
                A non-profit endowment building four connected spaces for care,
                immersion, training and community. America&apos;s first
                comprehensive Wellness City starts here.
              </p>
              <div className="btn-row">
                <a className="btn btn--primary" href="#message">
                  Send a message
                  {arrow}
                </a>
                <a className="btn btn--secondary" href="#spaces">
                  See the four spaces
                </a>
              </div>
            </div>
            <div className="hero__media span-6 start-7">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={assets.hero}
                alt="People training with AI, AR and VR wellness tools"
                style={{ ["--ly-pos" as string]: "50% 45%" }}
                fetchPriority="high"
              />
              <div className="ly-float">
                <div className="ly-float__row">
                  <span>Downtown St. Paul</span>
                  <span>Four spaces</span>
                </div>
                <div className="ly-float__title">3D Wellness Hub, planned</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* about · use · 1 screen · photo: training image-22 (unique) */}
      <section className="section" id="about" aria-labelledby="about-h">
        <div className="wrap grid grid--middle">
          <div className="span-6">
            <div className="section-head">
              <h2 id="about-h">
                The endowment in St. Paul.{" "}
                <span className="muted">Technology for neighbours left out.</span>
              </h2>
              <p>
                {site.name} serves communities that technology usually skips. We
                plan care, immersion and training under one roof in downtown St.
                Paul so neighbours can use tools that were built for someone else.
              </p>
            </div>
          </div>
          <div className="frame frame--photo frame--split span-6 start-7">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="frame__img"
              src={assets.training}
              alt="Immersive technology training for wellness careers"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* spaces · pinned-chapters · 2 screens · plan photos only once */}
      <section
        className="section"
        id="spaces"
        style={{ ["--h" as string]: 2, ["--hm" as string]: 2 }}
        data-moment="pinned-chapters"
        aria-labelledby="spaces-h"
      >
        <div className="wrap mo-pc__grid">
          <div className="mo-pc__text">
            <h2 id="spaces-h">Four spaces in one hub</h2>
            <ol className="mo-pc__steps">
              {plans.map((plan) => (
                <li className="mo-pc__step" key={plan.key}>
                  <h3>
                    {plan.title} · {plan.status}
                  </h3>
                  <p>{plan.short}</p>
                  <figure className="mo-pc__visual">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={plan.image} alt={plan.alt} width={1800} height={1200} />
                  </figure>
                </li>
              ))}
            </ol>
            <div className="btn-row" style={{ marginTop: "1.5rem" }}>
              <a className="btn btn--secondary" href="#message">
                Ask about a space
              </a>
            </div>
          </div>
          <div className="mo-pc__visuals frame" />
        </div>
      </section>

      {/* vision · full-width photo · image-13 (unique) */}
      <section className="section" id="vision" aria-labelledby="vision-h">
        <div className="wrap grid grid--middle">
          <div className="span-5">
            <div className="section-head">
              <h2 id="vision-h">St. Paul as a Wellness City</h2>
              <p>
                Health, healing and work sit in the same downtown block. The
                endowment is the hub: immersive rooms, restorative care and
                technology training that feed jobs and keep the street busy after
                offices close.
              </p>
            </div>
          </div>
          <div
            className="frame frame--photo span-6 start-7"
            style={{ ["--ratio" as string]: "75%" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="frame__img"
              src={assets.schoolFallback}
              alt="Wellness Technology International School campus view"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* word-highlight moment · type · 1 screen */}
      <section
        className="section statement"
        id="dignity"
        style={{ ["--h" as string]: 1 }}
        data-moment="word-highlight"
        aria-label="Dream Design Dignity"
      >
        <div className="wrap">
          <p className="t-label">{site.tagline}</p>
          <p className="mo-wh__text">
            We dream the spaces, design the wellness technology, and keep access
            open so every neighbour in downtown St. Paul can live with{" "}
            <strong>dignity</strong>.
          </p>
        </div>
      </section>

      {/* message · booking-form · photo: immersion fallback image-8 (unique) */}
      <section className="section" id="message" aria-labelledby="message-h">
        <div className="wrap grid grid--top">
          <div className="span-5">
            <div className="section-head">
              <h2 id="message-h">Contact the hub</h2>
              <p>
                Ask about the hub, a visit or how to support the build. We write
                back from {site.addressDistrict}.
              </p>
            </div>
            <form
              className="form"
              action={`mailto:${site.email}`}
              method="post"
              encType="text/plain"
              data-endpoint=""
              data-sent="Your message is in. We reply within a day."
              noValidate
            >
              <div className="field">
                <label htmlFor="f-name">Name</label>
                <input
                  id="f-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  aria-describedby="f-name-err"
                />
                <p className="field__error" id="f-name-err" hidden>
                  Write the name we should reply to.
                </p>
              </div>
              <div className="field">
                <label htmlFor="f-email">Email</label>
                <input
                  id="f-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  required
                  aria-describedby="f-email-err"
                />
                <p className="field__error" id="f-email-err" hidden>
                  Write an email address with an @, like name@example.com.
                </p>
              </div>
              <div className="field">
                <label htmlFor="f-note">Message</label>
                <textarea
                  id="f-note"
                  name="message"
                  rows={4}
                  required
                  aria-describedby="f-note-err"
                />
                <p className="field__error" id="f-note-err" hidden>
                  Write what you want to ask or share.
                </p>
              </div>
              <div className="btn-row">
                <button className="btn btn--primary" type="submit">
                  Send a message
                </button>
              </div>
              <p className="form__status" role="status" data-form-status="" />
              <p className="t-small muted">We reply within a day.</p>
            </form>
          </div>
          <div
            className="frame frame--photo span-6 start-7"
            style={{ ["--ratio" as string]: "85%" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="frame__img"
              src={assets.immersionLabFallback}
              alt="Immersion lab exhibit space"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  );
}
