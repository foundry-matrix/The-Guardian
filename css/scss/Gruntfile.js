module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        options: {
          style: 'compressed',
          outputStyle: 'compressed'
        },
        files: [
          {
            expand: true,
            cwd: 'sass/',
            src: ['sass/**/*.scss'],
            dest: 'css/',
            ext: '.css',
          },
        ],
      }
    },
    sassyclean: {
      options: {
        modules: ['sass/modules/**/*.scss', 'sass/themes/**/*.scss', 'sass/layout/**/*.scss', 'sass/base/**/*.scss'],
        buildfiles: ['sass/**/*.scss'],
        remove: false,
        days: null
      },
    },
     watch: {
      css: {
        files: ['sass/**/*.scss'],
        tasks: ['sass:dist'],
        options: {
          spawn: false,
          livereload: true
        },
      }
    }
  });
  grunt.loadNpmTasks('grunt-sassyclean');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['watch']);
};
