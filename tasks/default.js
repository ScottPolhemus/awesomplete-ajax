module.exports = function(grunt) {

  grunt.registerTask('build', ['browserify']);
   
  grunt.registerTask('default', ['build']);

};