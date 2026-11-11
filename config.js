/* =========================================================
   EDIT YOUR WEDDING DETAILS HERE
   Everything on the website is filled in from this file.
   Times are Indian Standard Time (IST), format: YYYY-MM-DDTHH:MM
   ========================================================= */
window.WEDDING = {
  invocation: "॥ Shree Ganeshaya Namah ॥",

  bride: {
    name: "Kanaka",
    fullName: "Kanaka",
    parents: "Daughter of Shanthi & Thakur",
    about: "Graceful, kind & the light of our family",
    photo: "" // optional, e.g. "images/bride.jpg"
  },
  groom: {
    name: "Anil",                 // ← change to the groom's name
    fullName: "Anil",
    parents: "Son of Geetha & Somla",
    about: "Warm, caring & forever by her side",
    photo: ""
  },

  // Main wedding moment (wedding day)
  weddingDate: "2026-12-25T10:30",
  heroDate: "25th December 2026",      // date shown on the main banner
  coinDay: "24 & 25",                  // day shown on the scratch coin
  countdownDate: "2026-12-24T16:00",   // countdown runs to the reception
  city: "Guntakal, AP, India",

  message:
    "With hearts full of joy, we invite you to bless the couple as they begin their beautiful journey together. Your presence will make our celebration complete.",

  familyLine: "Awaiting your gracious presence — The Naik & Sharma Families",
  hashtag: "#KanakaWedsAnil",

  venue: {
    name: "PMR's Convention Center",
    address: "Guntakal, Andhra Pradesh",
    mapUrl: "https://www.google.com/maps/place/PMR's+Convention+Center/@15.1498193,77.373388,17z/data=!3m1!4b1!4m6!3m5!1s0x3bb6e5004b9d271f:0x4a1bc252ac607e5e!8m2!3d15.1498193!4d77.3759629!16s%2Fg%2F11xgq64q1y",
    mapEmbed: "15.1498193,77.3759629" // map pin (latitude,longitude)
  },

  events: [
    {
      name: "Haldi",
      theme: "haldi",
      icon: "🌼",
      start: "2026-12-24T10:00", // ← time to be confirmed
      hours: 3,
      venue: "Janekunte Taanda",
      mapUrl: "https://www.google.com/maps/place/Janekunte+Thanda,+Janekunte,+Karnataka+583104/@15.13707,76.7994838,16z/data=!3m1!4b1!4m6!3m5!1s0x3bb76cc1b933d08d:0x843c543122bde9a8!8m2!3d15.1354283!4d76.8041703!16s%2Fg%2F1hhl96w0b",
      note: "A splash of turmeric, laughter & sunshine.",
      dress: "Shades of yellow",
      colors: ["#ffd23f", "#ffb703", "#fb8500"]
    },
    {
      name: "Mehendi",
      theme: "mehendi",
      icon: "🌿",
      start: "2026-12-23T17:00", // ← date/time to be confirmed
      hours: 4,
      venue: "Janekunte Taanda",
      mapUrl: "https://www.google.com/maps/place/Janekunte+Thanda,+Janekunte,+Karnataka+583104/@15.13707,76.7994838,16z/data=!3m1!4b1!4m6!3m5!1s0x3bb76cc1b933d08d:0x843c543122bde9a8!8m2!3d15.1354283!4d76.8041703!16s%2Fg%2F1hhl96w0b",
      note: "Henna, music & beautiful stories.",
      dress: "Greens & florals",
      colors: ["#2d6a4f", "#52b788", "#b7e4c7"]
    },
    {
      name: "Reception",
      theme: "reception",
      icon: "🥂",
      start: "2026-12-24T16:00",
      hours: 5,
      venue: "PMR's Convention Center",
      mapUrl: "https://www.google.com/maps/place/PMR's+Convention+Center/@15.1498193,77.373388,17z/data=!3m1!4b1!4m6!3m5!1s0x3bb6e5004b9d271f:0x4a1bc252ac607e5e!8m2!3d15.1498193!4d77.3759629!16s%2Fg%2F11xgq64q1y",
      note: "An evening of dinner, blessings & celebration.",
      dress: "Royal evening wear",
      colors: ["#03045e", "#0e7c7b", "#e9b949"]
    },
    {
      name: "Wedding Ceremony",
      theme: "wedding",
      icon: "🪔",
      start: "2026-12-25T10:30",
      hours: 3,
      venue: "PMR's Convention Center",
      mapUrl: "https://www.google.com/maps/place/PMR's+Convention+Center/@15.1498193,77.373388,17z/data=!3m1!4b1!4m6!3m5!1s0x3bb6e5004b9d271f:0x4a1bc252ac607e5e!8m2!3d15.1498193!4d77.3759629!16s%2Fg%2F11xgq64q1y",
      note: "The sacred rituals — witness two souls become one.",
      dress: "Traditional reds & golds",
      colors: ["#9d0208", "#d00000", "#e9b949"]
    }
  ],

  info: [
    { icon: "🚗", title: "Travel", text: "Free shuttle from Janekunte Taanda to the venue." },
    { icon: "🏨", title: "Stay", text: "Rooms are reserved for outstation guests. Please call us to book yours." },
    { icon: "🎁", title: "Gifts", text: "Your blessings and presence are the most precious gifts for us." },
    { icon: "📞", title: "Contact", text: "Dhanraj Naik (Groom Brother)", phone: "9916229907" }
  ],

  // RSVP: WhatsApp number with country code, digits only (e.g. "919876543210").
  // Leave empty to only show a thank-you message.
  rsvpWhatsApp: "",

  music: true // soft background melody after opening
};
