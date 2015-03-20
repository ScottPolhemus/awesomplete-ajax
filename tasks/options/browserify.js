module.exports = {

  'build': {
    options: {
      transform: ['browserify-shim'],
      browserifyOptions: {
        standalone: 'Awesomplete'
      }
    },
    files: {
      'build/awesomplete-ajax.js': ['src/awesomplete-ajax.js']
    }
  }

};