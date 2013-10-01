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
        options: {
            sourceMap: 'dist/ng-l20n.min.map',
            sourceMappingURL: 'ng-l20n.min.map', // drops the 'dist/' prefix from paths
            report: 'min',
        },
        files: {
            'dist/ng-l20n.min.js': ['dist/ng-l20n.js'],
        },
    },
};
