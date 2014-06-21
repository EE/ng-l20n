'use strict';

module.exports = function (grunt) {
    // Remove 'dist/' prefixes from paths put in the map file
    grunt.registerMultiTask('post-uglify', function () {
        this.files.forEach(function (mapping) {
            mapping.src.forEach(function (src) {
                grunt.file.write(src, grunt.file.read(src).replace(/"dist\//g, '"'));
            });
        });
    });
};
