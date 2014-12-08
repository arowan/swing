module.exports = function(grunt) {
  
  grunt.initConfig({
    concat: {
      client: {
        src:  ['src/client/**/*.js'],
        dest: 'public/assets/javascript/application.js'
      }
    },
    watch: {
      app: {
        files: ['src/**/*.js','spec/**/*Spec.js'],
        tasks: "default"
      }
    },
    jasmine: {
      jasmine: {
        pivotal: {
          options: {
            host: 'http://localhost:4000',
            specs: 'spec/client/networkSpec.js'
          }
        }
      }
    },
    mochaTest: {
      options: {
        reporter: 'spec',
        clearRequireCache: true,
        colors: true
      },
      all: ["spec/server/*Spec.js"]
    },
    nodemon: {
      dev: {
        script: 'src/server/server.js'
      }
    }
  });

  var defaultTestSrc = grunt.config('mochaTest.test.src');
  grunt.event.on('watch', function(action, filepath) {
    grunt.config('mochaTest.test.src', defaultTestSrc);
    if (filepath.match('test/')) {
      grunt.config('mochaTest.test.src', filepath);
    }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks("grunt-contrib-jasmine");
  grunt.loadNpmTasks("grunt-mocha-test");
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask("test", ["jasmine", "mochaTest"]);
  grunt.registerTask("default", ["test", "concat"]);
  grunt.registerTask("server", ['nodemon']);
  grunt.registerTask("client", ['watch']);

};