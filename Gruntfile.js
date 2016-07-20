'use strict';

module.exports = function(grunt){
  require('load-grunt-tasks')(grunt);

  // Time how long grunt task take. Can help when optimizing build times
  require('time-grunt')(grunt);
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
    clean: {
      build: 'config/config'
    },
    copy:{
      dev:{
        expand: true,
        cwd: 'config',
        src:'configdev.js',
        dest: 'config/config'
      },
      gamma:{
        expand: true,
        cwd: 'config',
        src:'configgamma.js',
        dest: 'config/config'
      },
      local:{
        expand: true,
        cwd: 'config',
        src:'configlocal.js',
        dest: 'config/config'
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
    },
    concat: {
      release: {
        files: {
          'config/config/config.js': 'config/config/*.js'
        }
      }
    }

  });

  /*grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
*/

  grunt.registerTask('build:debug', 'Lint and compile', [
   'jshint'
  ]);

  grunt.registerTask('build:release', 'Lint, compile, bundle, and optimize', [
     'jshint', 'uglify:release'
  ]);


};
