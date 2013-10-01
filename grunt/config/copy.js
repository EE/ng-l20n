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
    dist: {
        files: [
            {
                cwd: 'src',
                dest: 'dist',
                dot: true,
                expand: true,
                src: ['ng-l20n.js'],
            },
        ],
    },
};
