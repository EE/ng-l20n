/**
 * ng-l20n
 * https://github.com/EE/ng-l20n
 *
 * Author Michał Gołębiowski <michal.golebiowski@laboratorium.ee>
 * © 2012, 2013 Laboratorium EE
 * Licensed under the MIT license.
 */

'use strict';

module.exports = {
    main: {
        src: [
            'Gruntfile.js',
            'grunt/**/*.js',
        ],
        options: {
            jshintrc: '.jshintrc',
        }
    },
    src: {
        src: ['src/**/*.js'],
        options: {
            jshintrc: 'src/.jshintrc',
        }
    },
};
