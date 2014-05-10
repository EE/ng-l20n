ng-l20n [![Build Status](https://travis-ci.org/EE/ng-l20n.png?branch=master)](https://travis-ci.org/EE/ng-l20n)
=======

An AngularJS module handling the l20n localization library.

Usage
-----

Usage is simple - just use a `data-l20n` attribute with an l20n identificator (with a stock l20n you'd
use `data-l10n-id` instead) so tutorials from http://l20n.org still apply with this little change.

An example sandbox is included. You can freely use Angular expressions inside the attribute, they will be parsed for
you before passing to l20n.

Configuration
-------------

Locale is stored in `localStorage`. The `localStorage` key as well al the `$rootScope` property that stores
the locale are customizable:

```js
myApp.config(["l20nProvider", function(l20nProvider) {
  l20nProvider.localeStorageKey = 'myAppLocaleKey';    // default: 'locale'
  l20nProvider.localeProperty = 'myAppLocale';         // default: none
}]);
```

If the `localeProperty` is not specified, nothing will be saved to `$rootScope`.

Minification and linting
------------------------

Minification and linting is supported via Grunt tasks. To obtain the minified file together with the
sourcemap, first install a global `grunt-cli` package:

```bash
npm -g install grunt-cli
```

Then install local `npm` packages:
```bash
npm install
```

After performing these steps, invoking:
```bash
grunt
```
will lint & build the files; you can copy all 3 files (`ng-l20n.js`, `ng-l20n.min.js`, `ng-l20n.min.map`)
from the `dist/` folder.

Notes
-----

`ng-l20n` requires changes recently made in `l20n.js`. Because of that, it requires `l20n.js in version at least
beta 4.

To use
[overlaying nodes](https://blog.mozilla.org/l10n/2012/07/16/l20n-features-explained-dom-overlays/)
with ng-l20n you need to use a very recent `l20n.js` version (the one at commit
[3a73473](https://github.com/l20n/l20n.js/tree/3a73473c350e26786b7b4c2d72f9ada73d6f7aa0)
or newer), newer than any currently (as of 2013-10-01) available beta. You can use the
[version from this repository](https://github.com/EE/ng-l20n/blob/master/vendor/l20n.js)
if in doubt. Note that adding the `data-l10n-overlay` attribute is no longer needed for overlaying to work.

License
-------

The module is available under the MIT license (see MIT-LICENSE.txt for details).
