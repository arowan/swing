module.exports = function(grunt) {
  
  grunt.initConfig({
    concat: {
      server: {
        src:  [
          'public/assets/javascript/underscore.js',
          'src/server/gameobject.js',
          'src/server/actor.js',
          'src/server/player.js',
          'src/server/gamestate.js',
          'src/server/user.js',
          'src/server/server.js',
          'src/share/*.js'
        ],
        dest: 'build/server.js'
      },
      client: {
        src:  ['src/client/**/*.js'],
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
        src: [
          //'public/assets/javascript/jquery-2.1.1.min.js',
          'public/assets/javascript/underscore.js',
          // These are listed individually because if they aren't Jasmine loads
          // them in the wrong order and you get dependency errors.
          'src/server/gameobject.js',
          'src/server/actor.js',
          'src/server/player.js',
          'src/server/gamestate.js',
          'src/server/user.js',
          'src/server/server.js',
          'src/client/**/*.js',
          'src/shared/**/*.js'
        ],
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
