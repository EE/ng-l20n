/**
 * ng-l20n
 * https://github.com/EE/ng-l20n
 *
 * Author Michał Gołębiowski <michal.golebiowski@laboratorium.ee>
 * © 2012, 2013 Laboratorium EE
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        clean: require('./grunt/config/clean'),
        copy: require('./grunt/config/copy'),
        jshint: require('./grunt/config/lint/jshint'),
        jsonlint: require('./grunt/config/lint/jsonlint'),
        'merge-conflict': require('./grunt/config/lint/merge-conflict'),
        uglify: require('./grunt/config/uglify'),
        'post-uglify': require('./grunt/config/post-uglify'),
    });

    // Load all grunt tasks matching the `grunt-*` pattern.
    require('load-grunt-tasks')(grunt);

    // Load all custom tasks.
    grunt.loadTasks('grunt/tasks');


    grunt.registerTask('lint', [
        'jshint:main',
        'jshint:src',
        'jsonlint',
    ]);

    grunt.registerTask('minify', [
        'uglify',
        'post-uglify',
    ]);

    grunt.registerTask('test', [
        'clean',
        'merge-conflict',
        'lint',
    ]);

    grunt.registerTask('build', [
        'copy:dist',
        'minify',
    ]);

    grunt.registerTask('default', [
        'test',
        'build',
    ]);
};
