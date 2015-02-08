module.exports = function(grunt) {
  
  grunt.initConfig({
    // concat: {
    //   client: {
    //     src:  ['src/client/**/*.js', 'src/shared/**/*.js'],
    //     dest: 'public/assets/javascript/application.js'
    //   }
    // },
    sync: {
      main: {
        files: [{
          cwd: 'src',
          src: ['client/**/*', 'shared/**/*', 'vendor/*'],
          dest: 'public/assets/javascript/'
        }],
        verbose: true,
        updateAndDelete: true
      }
    },
    includeSource: {
      options: {
        basePath: 'src',
        baseUrl: 'public/assets/javascript/'
      },
      myTarget: {
        files: {
          'public/index.html': 'src/index.template.html'
        }
      }
    },
    watch: {
      app: {
        files: ['src/**/*.js','spec/**/*Spec.js'],
        tasks: "buildWithTest"
      }
    },
    jasmine: {
      pivotal: {
        src: [
          'public/assets/javascript/client/*.js',
          'public/assets/javascript/shared/*.js'
        ],
        options: {
          vendor: 'public/assets/javascript/vendor/*.js'
          ,
          display: 'full',
          specs: 'spec/client/*.js'
        }
      }
    },
    mochaTest: {
      options: {
        reporter: 'spec',
        clearRequireCache: true,
        colors: true,
        require: [
            'requirejs'
        ]
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
  grunt.loadNpmTasks('grunt-sync');

  grunt.registerTask("test", ["mochaTest"]);
  grunt.registerTask("buildWithTest", ["includeSource", "sync", "test"]);
  // grunt.registerTask("default", ["concat", "test"]);
  // grunt.registerTask("default", ["test"]);
  // grunt.registerTask("client", ['watch']);

  grunt.registerTask("dev", ["watch"]);
  // grunt.registerTask("prod", ['concat', 'test']);
  grunt.registerTask("server", ['nodemon']);

};
