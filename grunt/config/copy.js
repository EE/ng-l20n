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
