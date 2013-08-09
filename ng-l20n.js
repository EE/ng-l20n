/**
 * Author Michał Gołębiowski <michal.golebiowski@laboratorium.ee>
 * © 2012, 2013 Laboratorium EE
 *
 * License: MIT
 */

(function () {
    'use strict';

    angular.module('ngL20n', ['ngStorage'])

        .factory('l20n', function ($localStorage, $rootScope, documentL10n) {
            return {
                init: function init() {
                    if (!$localStorage.locale) {
                        // First visit to the site, set the default locale in localStorage.
                        $localStorage.locale = this.defaultLocale;
                    }
                    $rootScope.locale = $localStorage.locale;

                    // Dynamically change the site locale based on $rootScope.locale changes.
                    $rootScope.$watch('locale', function (newLocale) {
                        $localStorage.locale = newLocale;
                        documentL10n.registerLocales(newLocale);
                    });

                    $rootScope.changeLocale = function changeLocale(newLocale) {
                        $rootScope.locale = newLocale;
                    };
                },

                // Available locales in order of preference.
                // TODO get it from locales/l20n.json
                allLocales: ['en-US', 'pl'],

                get defaultLocale() {
                    // Returns a default locale that is presented to the user when they first visit the site.
                    if (this.allLocales.indexOf(navigator.language) !== -1) {
                        // The browser locale is available, use it.
                        return navigator.language;
                    } else {
                        // In the absence of an exact match, check if navigator.language is a substring
                        // of one of provided locales.
                        var firstMatchingLocale = _.filter(this.all, function (locale) {
                            return locale.indexOf(navigator.language) !== -1;
                        })[0];
                        if (firstMatchingLocale) {
                            return firstMatchingLocale;
                        }
                    }
                    // No match, just use the first available locale from the list.
                    return this.allLocales[0];
                },

                updateData: function updateData(data) {
                    // TODO remove it when L20n gets fixed.
                    documentL10n.updateData(data);
                    documentL10n.freeze(); // TODO maybe sub-optimal
                },
            };
        })

        .value('documentL10n', document.l10n) // it's provided as value to be easily mocked in tests

        .directive('l20n', function ($compile) {
            /**
             * Since the attribute data-l10n-id could hold not the localization id itself but a string
             * to be evaluated and l20n doesn't place nice with it, we need to pre-evaluate the attribute
             * and pass it to the data-l10n-id attribute later. The data-l10n-id attribute is, in turn,
             * processed by the l10nId directive.
             */
            return function (scope, element, attrs) {
                // Prepare for the l10nId directive.
                element.attr('data-l10n-id', attrs.l20n);
                // Prevent re-running this directive on $compile.
                element.removeAttr('l20n');
                element.removeAttr('data-l20n');
                // Compile to be parsed to the l10nId directive.
                $compile(element)(scope);
            };
        })

        .directive('l10nId', function (documentL10n) {
            /**
             * A hook for l20n library. All elements with a data-l10n-id attribute are processed by l20n.
             * Note: don't use this directive directly for anything other simple strings that don't need to
             * be evaluated, use (data-|)l20n (see in l20n directive comments for reasons).
             */
            return function (scope, element) {
                documentL10n.ready(function () {
                    documentL10n.localizeNode(element[0]);
                });
            };
        });

})();
