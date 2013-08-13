/**
 * Author Michał Gołębiowski <michal.golebiowski@laboratorium.ee>
 * © 2012, 2013 Laboratorium EE
 *
 * License: MIT
 */

(function () {
    'use strict';

    angular.module('ngL20n', [])

        .factory('l20n', ['$rootScope', 'documentL10n', function ($rootScope, documentL10n) {
            var l20n = {
                init: function init() {
                    $rootScope.changeLocale = function changeLocale(newLocale) {
                        // The main function for changing a locale. Everything gets triggered by changes
                        // made in this function.
                        $rootScope.locale = newLocale;
                    };

                    if (!localStorage.getItem('locale')) {
                        // First visit to the site, set the default locale in localStorage.
                        localStorage.setItem('locale', this.defaultLocale);
                    }
                    // Dynamically change the site locale based on $rootScope.locale changes.
                    documentL10n.addEventListener('ready', function onReady() {
                        documentL10n.removeEventListener('ready', onReady);

                        // Make sure a locale is registered at least once.
                        documentL10n.registerLocales($rootScope.locale);

                        $rootScope.$watch('locale', function (newLocale) {
                            if (newLocale) { // it might be undefined
                                localStorage.setItem('locale', newLocale);
                                documentL10n.registerLocales(newLocale);
                            }
                        });
                    });

                    $rootScope.locale = localStorage.getItem('locale');
                },

                // Available locales in order of preference.
                // TODO get it from the manifest file
                allLocales: ['en-US', 'pl'],

                get defaultLocale() {
                    var firstMatchingLocale, i,
                        navigatorLanguage = navigator.language;

                    // Returns a default locale that is presented to the user when they first visit the site.
                    if (this.allLocales.indexOf(navigatorLanguage) !== -1) {
                        // The browser locale is available, use it.
                        return navigatorLanguage;
                    } else {
                        // In the absence of an exact match, check if navigator.language is a substring
                        // of one of provided locales.
                        for (i = 0; i < this.allLocales.length; i++) {
                            firstMatchingLocale = this.allLocales[i];
                            if (firstMatchingLocale.indexOf(navigatorLanguage) !== -1) {
                                // We got the first matching locale.
                                break;
                            }
                        }
                        if (firstMatchingLocale) {
                            return firstMatchingLocale;
                        }
                    }
                    // No match, just use the first available locale from the list.
                    return this.allLocales[0];
                },

                updateData: function updateData() {
                    var event;

                    documentL10n.updateData.apply(documentL10n, arguments);

                    event = document.createEvent('HTMLEvents');
                    event.initEvent('l20n:dataupdated', true, true);
                    document.dispatchEvent(event);
                },
            };

            l20n.init();
            return l20n;
        }])

        .directive('l20n', ['$compile', function ($compile) {
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
                // Compile to be parsed by the l10nId directive link code.
                $compile(element)(scope);
            };
        }])

        .directive('l10nId', ['documentL10n', function (documentL10n) {
            /**
             * A hook for l20n library. All elements with a data-l10n-id attribute are processed by l20n.
             * Note: don't use this directive directly for anything other simple strings that don't need to
             * be evaluated, use (data-|)l20n (see in l20n directive comments for reasons).
             */
            return function (scope, element) {
                function updateTranslation() {
                    documentL10n.localizeNode(element[0]);
                }

                documentL10n.ready(function () {
                    document.addEventListener('l20n:dataupdated', updateTranslation);
                    updateTranslation();
                });
            };
        }])

        .value('documentL10n', document.l10n); // it's provided as value to be easily mocked in tests

})();
