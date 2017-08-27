'use strict';

module.exports = {
    files: [
        '*',
        'sandbox/**/*',
        'src/**/*',
        '!**/*.md', // Markdown files are incorrectly detected as containing conflicts.
    ],
};
