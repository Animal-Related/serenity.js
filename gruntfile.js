/* jshint node:true */
module.exports = function(grunt) {
  'use strict';

  // Load all grunt taks matching grunt-*
  require('load-grunt-tasks')(grunt);

  // Project config
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      dev: {
        src: '.',
        options: {
          force: true
        }
      }
    },

    connect: {
      keepalive: {
        options: {
          keepalive: true,
          livereload: true
        }
      },
      moveon: {
        options: {
          livereload: true
        }
      }
    },

    watch: {
      project: {
        files: '*',
        tasks: 'jshint',
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.registerTask('jshintServe', 'Start server',
      ['connect:moveOn', 'watch']);

  grunt.registerTask('default', 'Start server',
      ['connect:keepalive']);
};
