/**
 * Author Michał Gołębiowski <michal.golebiowski@laboratorium.ee>
 * © 2012, 2013 Laboratorium EE
 *
 * License: MIT
 */

(function () {
    'use strict';

    angular.module('ngL20n', [])

        .factory('l20n', function ($rootScope) {
            var l20n = {
                init: function init() {
                    var context;

                    context = this.context = L20n.getContext();

                    // Register all available locales first.
                    context.registerLocales.apply(context, this.allLocales);

                    context.linkResource(function (locale) {
                        return '/sandbox/locales/' + locale + '.l20n';
                    });

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
                    context.addEventListener('ready', function onReady() {
                        context.removeEventListener('ready', onReady);

                        // Make sure a locale is registered at least once.
                        context.registerLocales($rootScope.locale);

                        $rootScope.$watch('locale', function (newLocale) {
                            if (newLocale) { // it might be undefined
                                localStorage.setItem('locale', newLocale);
                                context.registerLocales(newLocale);
                            }
                        });
                    });

                    $rootScope.locale = localStorage.getItem('locale');

                    context.freeze();
                },

                // Available locales in order of preference.
                // TODO get it from a configuration file
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

                updateData: function updateData() {
                    var event,
                        context = this.context;

                    context.updateData.apply(context, arguments);
                    event = document.createEvent('HTMLEvents');
                    event.initEvent('l20n:dataupdated', true, true);
                    document.dispatchEvent(event);
                },
            };

            l20n.init();
            return l20n;
        })

        .directive('l20n', function (l20n) {
            /**
             * Translates the node.
             */
            return function (scope, element, attrs) {
                var context = l20n.context;

                function updateTranslation() {
                    element.text(context.get(attrs.l20n));
                }

                context.ready(function () {
                    document.addEventListener('l20n:dataupdated', updateTranslation);
                    updateTranslation();
                });
            };
        });

})();
