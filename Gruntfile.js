'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        clean: require('./grunt/config/clean'),
        copy: require('./grunt/config/copy'),
        eslint: require('./grunt/config/lint/eslint'),
        jscs: require('./grunt/config/lint/jscs'),
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
        'eslint',
        'jscs',
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
