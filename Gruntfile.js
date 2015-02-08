module.exports = function(grunt) {
  
  grunt.initConfig({
    // concat: {
    //   client: {
    //     src:  ['src/client/**/*.js', 'src/shared/**/*.js'],
    //     dest: 'public/assets/javascript/application.js'
    //   }
    // },
    includeSource: {
      options: {
        basePath: ['src/client', 'src/shared'],
        baseUrl: 'public/assets/javascript/'
      },
      myTarget: {
        files: {
          'public/index.html': 'src/index.html'
        }
      }
    },
    watch: {
      app: {
        files: ['src/**/*.js','spec/**/*Spec.js'],
        tasks: "default"
      }
    },
    jasmine: {
      pivotal: {
        src: [
          'public/assets/javascript/application.js'
        ],
        options: {
          vendor: [
            'public/assets/javascript/jquery-2.1.1.min.js',
            'spec/vendor/socket.io.client.js',
            'public/assets/javascript/underscore.js',
            'public/assets/javascript/require.js',
            'public/assets/javascript/phaser.min.js',
            'public/assets/javascript/phaser-plugin-isometric.js'
          ],
          display: 'full',
          specs: 'spec/client/*.js'
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
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-jasmine");
  grunt.loadNpmTasks("grunt-mocha-test");
  grunt.loadNpmTasks("grunt-nodemon");
  grunt.loadNpmTasks("grunt-include-source");

  grunt.registerTask("test", ["jasmine", "mochaTest"]);
  // grunt.registerTask("default", ["concat", "test"]);
  // grunt.registerTask("default", ["test"]);
  // grunt.registerTask("client", ['watch']);

  grunt.registerTask("dev", ['watch', 'test', 'includeSource']);
  // grunt.registerTask("prod", ['concat', 'test']);
  grunt.registerTask("server", ['nodemon']);

};
