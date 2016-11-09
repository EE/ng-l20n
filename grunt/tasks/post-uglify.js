'use strict';

module.exports = function (grunt) {
    // Remove 'dist/' prefixes from paths put in the map file
    grunt.registerMultiTask('post-uglify', function () {
        for (const {src} of this.files) {
            for (const source of src) {
                grunt.file.write(source, grunt.file.read(source).replace(/"dist\//g, '"'));
            }
        }
    });
};
