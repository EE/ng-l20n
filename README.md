ng-l20n
=======

An AngularJS module handling the l20n localization library.

Usage
-----

Usage is simple - just use an `l20n` or `data-l20n` attribute with an l20n identificator (with a stock l20n you'd
use `l10n-id` or `data-l10n-id` instead) so tutorials from http://l20n.org still apply with this little change.

An example sandbox is included. You can freely use Angular expressions inside the attribute, they will be parsed for
you before passing to l20n.

License
-------

The module is available under the MIT license (see MIT-LICENSE.txt for details).

Notes
-----

`ng-l20n` requires changes recently made in `l20n.js`. Because of that, it requires `l20n.js in version at least
beta 4.

`ng-l20n` doesn't support [overlaying nodes](https://blog.mozilla.org/l10n/2012/07/16/l20n-features-explained-dom-overlays/) yet.
