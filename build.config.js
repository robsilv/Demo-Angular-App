module.exports = {
  port: 8000,

  files: {
    js: {

      // Use uncompressed versions of 3rd-pary libraries.
      // They will be compressed in production.
      // Any libraries added to /vendor must be added here.
      // If you remove a library you must remove it here too.
      vendor: [
        'vendor/angular/angular.js',
        'vendor/angular-loading-bar/src/loading-bar.js',
        'vendor/angular-mocks/angular-mocks.js',
        'vendor/angular-ui-router/release/angular-ui-router.js',
        'vendor/jquery/dist/jquery.js',
        'vendor/bootstrap/dist/js/bootstrap.js',
        'vendor/d3/d3.js',
        'vendor/lodash/dist/lodash.js'
      ],

      app: [
        'app/app.js',
        'app/**/*.js',
        '!app/**/*-spec.js',
        '!app/**/*-scenario.js',
      ],

      buildDest: 'build/js'
    },

    css: {
      main: [
        'app/**/*.css',
        '!app/assets/*.css',
        '!app/assets/**/*.css',
        'app/common/**/*.css',
        'app/components/**/*.css',
        'vendor/angular-loading-bar/src/loading-bar.css',
        'vendor/bootstrap/dist/css/bootstrap.css',
        'vendor/bootstrap/dist/css/bootstrap-theme.css'
      ],

      buildDest: 'build/css'
    },
    html: {
      index: 'app/index.html',

      tpls: {
        all: 'app/**/*-template.html'
      },

      buildDest: 'build'
    },

    img: {
      src: [
        'app/assets/images/*.png',
        'app/assets/images/*.jpg',
        'app/assets/css/sprites/**/*.svg',
        'app/assets/css/sprites/**/*.png'
      ],
      buildDest: './build/img'
    },
    svg: {
      src: 'app/assets/images/svgs/src/*.svg',
      dest: 'app/assets/images/svgs/dest'
    },
    fonts: {
      src: 'app/assets/fonts/**/*',
      buildDest: 'build/fonts'
    },

    map: {
      src: 'vendor/bootstrap/dist/css/bootstrap-theme.css.map',
      name: 'bootstrap-theme.css.map',
      buildDest: 'build/css'
    },

    test: {
      e2e: 'app/**/*-scenario.js',

      unit: [
        'build/js/vendor.js',
        'test/mock/*.js',
        'build/js/templates.js',
        'build/js/app.js',
        'app/**/*-spec.js'
      ]
    }
  }
}