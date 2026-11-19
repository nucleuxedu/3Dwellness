/** Content from 3dwellness.org — Dream. Design. Dignity. */

export const site = {
  name: "3D Wellness Endowment",
  tagline: "Dream. Design. Dignity",
  fullName: "3D Wellness Endowment: Dream. Design. Dignity",
  missionShort: "Connecting the Disconnected",
  email: "admin@3dwellness.org",
  /** Street + district only (skill contacts rule); no house number or postcode */
  addressStreet: "Exchange E.",
  addressDistrict: "St. Paul",
  addressLine: "Exchange E., St. Paul",
  address: "Exchange E., St. Paul",
  mapQuery: "Exchange%20E.%20St.%20Paul%20Minnesota",
  /** Not a real phone format (skill contacts rule) */
  phone: "Office line on request",
  phoneHref: "#message",
  copyright: "© 2026 3D Wellness Endowment",
};

export const assets = {
  hero: "/assets/images/image-1.jpg",
  scrollLottie: "/assets/images/image-2.json",
  healing: "/assets/images/image-3.png",
  immersionLab: "/assets/images/image-4.jpg",
  school: "/assets/images/image-5.jpg",
  community: "/assets/images/image-6.jpg",
  immersionLabFallback: "/assets/images/image-8.jpg",
  schoolFallback: "/assets/images/image-13.jpg",
  training: "/assets/images/image-22.jpg",
  favicon: "/assets/images/image-32.svg",
};

export const plans = [
  {
    key: "healing",
    title: "Healing Hub",
    short: "Basement care with light, sound and massage.",
    description:
      "An integrated preventive and restorative wellness center with infrared light therapy, massage, sound and other non-invasive care.",
    image: assets.healing,
    alt: "Healing Hub wellness technology center render",
    status: "Planned",
  },
  {
    key: "lab",
    title: "5D Immersion Lab",
    short: "AI, AR and VR wellness exhibits.",
    description:
      "An AI, AR and VR experiential space with interactive wellness and cultural storytelling exhibits.",
    image: assets.immersionLab,
    alt: "5D Wellness Immersion Lab render",
    status: "Planned",
  },
  {
    key: "school",
    title: "Wellness Technology School",
    short: "Training pathways for youth and adults.",
    description:
      "An education and workforce hub with training in emerging technology and pathways into future-ready careers.",
    image: assets.school,
    alt: "Wellness Technology International School render",
    status: "Planned",
  },
  {
    key: "commons",
    title: "Community Commons",
    short: "Events, kitchen and a greenhouse.",
    description:
      "A flexible space for gatherings and wellness programs, with a greenhouse, commercial kitchen and cafeteria.",
    image: assets.community,
    alt: "Community Commons and Culinary Innovation render",
    status: "Planned",
  },
];
