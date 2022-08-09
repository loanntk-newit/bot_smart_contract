/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
    './templates/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      ...colors,
      transparent: 'transparent',
      current: 'current',
      facebook: {
        regular: '#3b5999',
        active: '#344e87',
      },
      twitter: {
        regular: '#1da1f2',
        active: '#0d95e8',
      },
      instagram: {
        regular: '#e4405f',
        active: '#e02549',
      },
      github: {
        regular: '#222',
        active: '#131313',
      },
      pinterest: {
        regular: '#bd081c',
        active: '#a00718',
      },
      youtube: {
        regular: '#cd201f',
        active: '#b21c1b',
      },
      vimeo: {
        regular: '#1ab7ea',
        active: '#13a3d2',
      },
      slack: {
        regular: '#3aaf85',
        active: '#329874',
      },
      dribbble: {
        regular: '#ea4c89',
        active: '#e73177',
      },
      reddit: {
        regular: '#ff4500',
        active: '#e03d00',
      },
      tumblr: {
        regular: '#35465c',
        active: '#2a3749',
      },
      linkedin: {
        regular: '#0077b5',
        active: '#00669c',
      },
    },
    extend: {
      minHeight: {
        'screen-75': '75vh',
      },
      fontSize: {
        55: '55rem',
      },
      opacity: {
        80: '.8',
      },
      zIndex: {
        2: 2,
        3: 3,
      },
      inset: {
        '-100': '-100%',
        '-225-px': '-225px',
        '-160-px': '-160px',
        '-150-px': '-150px',
        '-94-px': '-94px',
        '-50-px': '-50px',
        '-29-px': '-29px',
        '-20-px': '-20px',
        '25-px': '25px',
        '40-px': '40px',
        '95-px': '95px',
        '145-px': '145px',
        '195-px': '195px',
        '210-px': '210px',
        '260-px': '260px',
      },
      height: {
        '95-px': '95px',
        '70-px': '70px',
        '350-px': '350px',
        '500-px': '500px',
        '600-px': '600px',
      },
      maxHeight: {
        '860-px': '860px',
      },
      maxWidth: {
        '100-px': '100px',
        '120-px': '120px',
        '150-px': '150px',
        '180-px': '180px',
        '200-px': '200px',
        '210-px': '210px',
        '580-px': '580px',
      },
      minWidth: {
        '140-px': '140px',
        48: '12rem',
      },
      backgroundSize: {
        full: '100%',
      },
    },
  },
  variants: [
    'responsive',
    'group-hover',
    'focus-within',
    'first',
    'last',
    'odd',
    'even',
    'hover',
    'focus',
    'active',
    'visited',
    'disabled',
  ],
  plugins: [
    plugin(function ({ addComponents, theme }) {
      const screens = theme('screens', {})
      addComponents([
        {
          '.container': { width: '100%' },
        },
        {
          [`@media (min-width: ${screens.sm})`]: {
            '.container': {
              'max-width': '640px',
            },
          },
        },
        {
          [`@media (min-width: ${screens.md})`]: {
            '.container': {
              'max-width': '768px',
            },
          },
        },
        {
          [`@media (min-width: ${screens.lg})`]: {
            '.container': {
              'max-width': '1024px',
            },
          },
        },
        {
          [`@media (min-width: ${screens.xl})`]: {
            '.container': {
              'max-width': '1280px',
            },
          },
        },
        {
          [`@media (min-width: ${screens['2xl']})`]: {
            '.container': {
              'max-width': '1280px',
            },
          },
        },
      ])
    }),
  ],
}
