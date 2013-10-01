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
    // Remove 'dist/' prefixes from paths put in the map file
    grunt.registerMultiTask('post-uglify', function () {
		this.files.forEach(function( mapping ) {
			mapping.src.forEach( function( src ) {
				grunt.file.write( src, grunt.file.read( src ).replace( /"dist\//g, '"' ) );
			});
		});
	});
};
