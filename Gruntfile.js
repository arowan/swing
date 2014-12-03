module.exports = function(grunt) {
  
  grunt.initConfig({
    concat: {
      server: {
        src:  ['src/server/*.js', 'src/share/*.js'],
        dest: 'build/server.js'
      },
      client: {
        src:  ['src/client/*.js', 'src/share/*.js'],
        dest: 'public/assets/javascript/application.js'
      }
    },
    watch: {
      app: {
        files: ['src/**/*.js','spec/**/*Spec.js'],
        tasks: ['concat','jasmine']
      }
    },
    jasmine: {
      pivotal: {
        src: 'src/**/*.js',
        options: {
          specs: 'spec/**/*Spec.js',
          helpers: 'spec/**/*Helper.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('default', ['concat']);
};
