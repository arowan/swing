module.exports = function(grunt) {
  
  grunt.initConfig({
    concat: {
      server: {
        src:  ['src/server/*.js', 'src/share/*.js'],
        dest: 'build/server.js',
      },
      client: {
        src:  ['src/client/*.js', 'src/share/*.js'],
        dest: 'public/assets/javascript/application.js',
      },
    },
    watch: {
      app: {
        files: 'src/**/*.js',
        tasks: ['concat']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['concat']);
};
