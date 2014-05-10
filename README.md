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

`ng-l20n` requires `l20n.js` in version 1.0 Release Candidate or newer.

License
-------

The module is available under the MIT license (see MIT-LICENSE.txt for details).
