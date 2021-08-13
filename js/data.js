// All the works on the page. Images are in /img, saved from the old WordPress site.
const WEB_DESIGNS = [
  { img: 'web-moralsight', title: 'MoralSight - login page' },
  { img: 'web-dashboard', title: 'Health dashboard tiles' },
  { img: 'web-prawny', title: 'Prawny Media - landing page' },
  { img: 'web-nature', title: 'The Wonder of Nature - video landing page' },
  { img: 'web-signin', title: 'Sign in / sign up form' },
  { img: 'web-koit', title: 'Koit - landing page' },
  { img: 'web-photography', title: 'Gren Photography - one page portfolio', tall: true },
  { img: 'web-grentunes', title: 'GrenTunes - music app landing page', tall: true }
];

// Sketch app designs: wireframe on the left, final design on the right
const APPS = [
  { name: 'Task Management App', text: 'An app to help set your daily task, task routines, reminders and other contents.', wire: 'task-wire', ui: 'task-ui' },
  { name: 'Personal Blog App', text: 'An app where you can set up your own blog: travels, personal stories, etc.', wire: 'blog-wire', ui: 'blog-ui' },
  { name: 'Notes App', text: 'I like taking notes, and one of my ideas is to create a note app like I’m creating a blog.', wire: 'notes-wire', ui: 'notes-ui' }
];

const ARTS = [
  'Flaming skull', 'Rhino', 'Swag', 'Astronaut on the moon', 'The hammer',
  'Elephants', 'Unicorn', 'Island wave', 'Cat and flowers', 'Space helmet'
];

const POSTERS = [
  { img: 'poster-manila-1', title: 'Visit Manila' },
  { img: 'poster-vaccine', title: 'Get yourself vaccinated' },
  { img: 'poster-pawikan', title: 'Pawikan: help us save them' },
  { img: 'poster-piso', title: 'Piso' },
  { img: 'poster-manila-2', title: 'Visit Manila (night)' },
  { img: 'poster-covid', title: 'COVID-19 health reminders' }
];

const OTHERS = [
  { img: 'other-1', title: 'Healthy habits illustration' },
  { img: 'other-2', title: 'HOEC 5th anniversary outreach program' },
  { img: 'other-3', title: 'Typography portrait' },
  { img: 'other-4', title: 'Rocket and moon' },
  { img: 'other-5', title: 'Construction company website' },
  { img: 'other-6', title: 'Photo manipulation' }
];

const SKILLS = {
  web: [
    { name: 'HTML5', value: 90, color: '#f0323c' },
    { name: 'CSS3', value: 90, color: '#2a6df4' },
    { name: 'JavaScript', value: 75, color: '#f7a531' },
    { name: 'PHP', value: 50, color: '#3b3df0' },
    { name: 'WordPress', value: 80, color: '#f23bd7' },
    { name: 'WooCommerce', value: 75, color: '#8a3cf0' }
  ],
  ui: [
    { name: 'Wireframes', value: 90, color: '#f0323c' },
    { name: 'Figma', value: 80, color: '#f7a531' },
    { name: 'Sketch', value: 80, color: '#34f06a' }
  ]
};
