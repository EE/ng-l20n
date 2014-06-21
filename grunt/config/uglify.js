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
