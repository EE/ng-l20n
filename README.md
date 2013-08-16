ng-l20n
=======

An AngularJS module handling the l20n localization library.

Usage
-----

Usage is simple - just use an `l20n` or `data-l20n` attribute with an l20n identificator (with a stock l20n you'd
use `l10n-id` or `data-l10n-id` instead) so tutorials from http://l20n.org still apply with this little change.

An example sandbox is included. You can freely use Angular expressions inside the attribute, they will be parsed for
you before passing to l20n.

Notes
-----

This module is in its early stage. Ideally, some options should be configurable outside of the main ng-l20n.js file.
However, the module is very small so modifying it shouldn't be too hard.

Currently, the assumptions are that available locales are `en-US` and `pl` (feel free to change them) and that all
l20n translation files are located under `/locales/` directory, in files named `$locale.l20n`, eg `en-US.l20n`.

License
-------

The module is available under the MIT license (see MIT-LICENSE.txt for details).
