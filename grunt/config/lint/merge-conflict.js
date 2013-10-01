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
    files: [
        '*',
        'src/**/*',
        '!**/*.md', // Markdown files are incorrectly detected as containing conflicts.
    ],
};
