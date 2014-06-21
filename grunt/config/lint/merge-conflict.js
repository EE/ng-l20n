'use strict';

module.exports = {
    files: [
        '*',
        'src/**/*',
        '!**/*.md', // Markdown files are incorrectly detected as containing conflicts.
    ],
};
