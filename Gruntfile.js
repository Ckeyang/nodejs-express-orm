'use strict';

module.exports = function(grunt){
  grunt.initConfig({

    jshint: {

      build: {
        src: ['Gruntfile.js'],
        options: {
          jshintrc: '.jshintrc'
        }
      },
      server: {
        src: ['server.js'],
        options: {
          jshintrc: '.jshintrc'
        }
      }
    },


    watch: {
      lint_server: {
        files: ['server.js'],
        tasks: ['jshint:server']
      },

      // run the whole build again if the process changes
      rebuild: {
        files: ['Gruntfile.js'],
        tasks: ['jshint:build', 'build:debug']
      }

    },

    nodemon: {
      dev: {
        options: {
          file: 'server.js'
        }
      }
    },

    concurrent: {
      dev: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('build:debug', 'Lint and compile', [
   'jshint'
  ]);

  grunt.registerTask('build:release', 'Lint, compile, bundle, and optimize', [
     'jshint', 'uglify:release'
  ]);

  grunt.registerTask('dev', ['build:debug', 'concurrent']);
};
