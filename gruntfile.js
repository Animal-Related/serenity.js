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
      serve: {
        options: {
          livereload: true
        }
      }
    },

    watch: {
      livereload: {
        files: '*',
        tasks: 'jshint',
        options: {
          livereload: true
        }
      },
      noreload: {
        files: '*',
        tasks: 'jshint'
      }
    }
  });

  grunt.registerTask('livereload', 'Start server',
      ['connect', 'watch:livereload']);

  grunt.registerTask('default', 'Start server',
      ['connect', 'watch:noreload']);
};
