const withPWA = require('next-pwa');

module.exports = [
  [
    withPWA,
    {
      pwa: {
        disable: process.env.NODE_ENV === 'development',
        dest: `public`,
        register: false,
        swSrc: './service-worker.js',
        publicExcludes: ['!favicon/**/*'],
      },
    },
  ],
];
