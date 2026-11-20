import Head from "next/head";

function Mark() {
  return (
    <svg viewBox="0 0 40 40" width="28" height="28" aria-hidden="true">
      <path d="M20 6 33 13.5v15L20 36 7 28.5v-15L20 6Z" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M20 6v14.5M20 20.5 7 13.5M20 20.5 33 13.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="20" cy="20.5" r="2.4" fill="currentColor" />
    </svg>
  );
}

const rooms = [
  { id: "care", name: "Healing Hub", line: "Infrared light, massage and sound.", value: "Care" },
  { id: "lab", name: "Immersion Lab", line: "Headset exhibits you walk through.", value: "Lab" },
  { id: "school", name: "Technology school", line: "Training for youth and adults.", value: "School" },
  { id: "meals", name: "Community commons", line: "A greenhouse, a kitchen and a cafeteria.", value: "Meals" },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>3D Wellness Endowment: a wellness center for St. Paul</title>
      </Head>
      <header className="nav nav--centre">
        <div className="wrap nav__bar">
          <a className="skip-link" href="#top">Skip to content</a>
          <a className="nav__logo" href="#top"><Mark />3D Wellness</a>
          <nav className="nav__links" aria-label="Main">
            <div className="nav__item">
              <a className="nav__link" href="#spaces">
                Rooms
                <svg className="chev" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
              <div className="nav__menu">
                <div className="wrap grid">
                  <div className="menu-col span-4">
                    <p className="t-label">Rooms</p>
                    <a href="#care">Healing Hub<span>Light, massage and sound</span></a>
                    <a href="#lab">Immersion Lab<span>Headset exhibits</span></a>
                  </div>
                  <div className="menu-col span-4">
                    <p className="t-label">Also on the plan</p>
                    <a href="#school">Technology school<span>Youth and adults</span></a>
                    <a href="#meals">Community commons<span>Kitchen and greenhouse</span></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="nav__item"><a className="nav__link" href="#hub">The plan</a></div>
            <div className="nav__item"><a className="nav__link" href="#school">School</a></div>
            <div className="nav__item"><a className="nav__link" href="#care">Care</a></div>
          </nav>
          <div className="nav__actions">
            <a className="btn btn--primary" href="#visit">Send a message</a>
          </div>
          <button className="nav__toggle" type="button" aria-expanded="false" aria-label="Menu">
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M2 5h14M2 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero hero--photo" data-enter data-calm="left" aria-labelledby="hero-h">
          <img
            className="hero__bg"
            src="/images/immersion-1600.jpg"
            srcSet="/images/immersion-800.jpg 800w, /images/immersion-1600.jpg 1600w"
            sizes="100vw"
            width={1600}
            height={823}
            alt="A person wearing a headset in blue light"
            style={{ ["--ly-pos" as string]: "70% 40%", ["--ly-pos-phone" as string]: "72% 35%" }}
          />
          <div className="wrap">
            <div className="hero-text">
              <div className="hero__text">
                <h1 id="hero-h">Wellness center in St. Paul</h1>
                <p className="hero__lead">3D Wellness Endowment is planning four rooms for care, training and meals in downtown St. Paul. None is open yet.</p>
                <div className="btn-row">
                  <a className="btn btn--primary" href="#visit">Send a message</a>
                  <a className="btn btn--secondary" href="#spaces">See the rooms</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="spaces" style={{ ["--h" as string]: 1 }} aria-labelledby="spaces-h">
          <div className="wrap">
            <div className="section-head">
              <h2 id="spaces-h">Rooms</h2>
              <p>Care, a lab, a school and shared meals. None has a price yet.</p>
            </div>
            <div className="grid grid--top">
              <ul className="rows span-5">
                {rooms.map((room) => (
                  <li key={room.id} id={room.id}>
                    <span className="rows__name">{room.name}</span>
                    <p>{room.line}</p>
                    <span className="rows__value">{room.value}</span>
                  </li>
                ))}
              </ul>
              <figure className="develop span-6 start-7" data-moment="picture-develops">
                <img src="/images/healing.jpg" alt="A therapy lamp in a dark room" width="867" height="1300" loading="lazy" />
              </figure>
            </div>
          </div>
        </section>

        <section className="section statement" id="hub" data-moment="word-highlight" aria-label="The plan">
          <div className="wrap">
            <p className="t-label">The plan</p>
            <p className="mo-wh__text">The greenhouse sits under a glass roof beside the kitchen, and the care room is kept dark so the tools can use <strong>light</strong>.</p>
          </div>
        </section>

        <section className="section" id="visit" style={{ ["--h" as string]: 1 }} aria-labelledby="visit-h">
          <div className="wrap">
            <div className="section-head">
              <h2 id="visit-h">Contact</h2>
              <p>Write about the hub.</p>
            </div>
            <div className="grid grid--top">
              <div className="span-5">
                <address>
                  Exchange E.<br />
                  downtown St. Paul
                </address>
                <p><a className="link" href="https://www.openstreetmap.org/search?query=Exchange+E.+downtown+St.+Paul">Get directions</a></p>
                <form
                  className="form"
                  action="mailto:hello@3dwellness.example"
                  method="post"
                  encType="text/plain"
                  data-endpoint=""
                  data-sent="Your message is in."
                  noValidate
                >
                  <div className="field">
                    <label htmlFor="f-name">Name</label>
                    <input id="f-name" name="name" type="text" autoComplete="name" required aria-describedby="f-name-err" />
                    <p className="field__error" id="f-name-err" hidden>Write your name.</p>
                  </div>
                  <div className="field">
                    <label htmlFor="f-email">Email</label>
                    <input id="f-email" name="email" type="email" autoComplete="email" inputMode="email" required aria-describedby="f-email-err" />
                    <p className="field__error" id="f-email-err" hidden>Write an email address with an @.</p>
                  </div>
                  <div className="field">
                    <label htmlFor="f-note">Message</label>
                    <input id="f-note" name="message" type="text" autoComplete="off" required aria-describedby="f-note-err" />
                    <p className="field__error" id="f-note-err" hidden>Write what you want to ask.</p>
                  </div>
                  <div className="btn-row">
                    <button className="btn btn--primary" type="submit">Send a message</button>
                  </div>
                  <p className="form__status" role="status" data-form-status />
                  <p className="t-small muted">There is no published reply time.</p>
                </form>
              </div>
              <figure className="develop span-6 start-7">
                <img src="/images/vision.jpg" alt="Downtown buildings at dusk" width="1880" height="1253" loading="lazy" />
              </figure>
            </div>
          </div>
        </section>

      </main>

      <footer className="footer closing footer--dark ground-inverse" aria-labelledby="close-h">
        <div className="wrap">
          <div className="closing__cta close--type">
            <div className="section-head">
              <h2 id="close-h">Send a message about the hub</h2>
              <p>None of the four rooms is open.</p>
            </div>
            <a className="btn btn--primary btn--xl" href="#visit">
              Send a message
              <svg className="m-arrow" viewBox="0 0 12 12" aria-hidden="true"><path className="m-arrow__stem" d="M1 6h8" /><path className="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" /></svg>
            </a>
          </div>
          <div className="closing__links">
            <div className="grid">
              <div className="span-4">
                <a className="nav__logo" href="#top"><Mark />3D Wellness</a>
                <p className="footer__lede">A non-profit in downtown St. Paul.</p>
                <p>Exchange E., downtown St. Paul</p>
              </div>
              <div className="footer__col span-2">
                <h3>Rooms</h3>
                <ul>
                  <li><a href="#spaces">Rooms</a></li>
                  <li><a href="#meals">Community commons</a></li>
                </ul>
              </div>
              <div className="footer__col span-2">
                <h3>The plan</h3>
                <ul><li><a href="#hub">The plan</a></li></ul>
              </div>
              <div className="footer__col span-2">
                <h3>School</h3>
                <ul><li><a href="#school">Technology school</a></li></ul>
              </div>
              <div className="footer__col span-2">
                <h3>Care</h3>
                <ul><li><a href="#care">Healing Hub</a></li></ul>
              </div>
            </div>
            <div className="footer__legal">
              <span>© {new Date().getFullYear()} 3D Wellness Endowment</span>
            </div>
          </div>
        </div>
      </footer>
      <nav className="actionbar" aria-label="Quick actions">
        <a className="btn btn--primary" href="#visit">Send a message</a>
      </nav>
    </>
  );
}
