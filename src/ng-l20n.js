/**
 * Author Michał Gołębiowski <michal.golebiowski@laboratorium.ee>
 * © 2012, 2013 Laboratorium EE
 *
 * License: MIT
 */

(function () {
    'use strict';

    angular.module('ngL20n', [])

        .provider('l20n', function () {

            var previousLocale, locale,
                l20nProvider = this;

            l20nProvider.localeStorageKey = 'ngL20nLocale';

            l20nProvider.$get = function ($rootScope, documentL10n) {
                var l20nService = new function L20n() {
                    this.updateData = updateData;
                    this.changeLocale = changeLocale;
                };

                // Initialize to locale from localStorage if one exist. Otherwise, fall back
                // to the locale negotiated by L20n.
                documentL10n.once(function () {
                    $rootScope.$apply(function () {
                        l20nService.changeLocale(localStorage.getItem(l20nProvider.localeStorageKey) ||
                            documentL10n.supportedLocales[0]);
                    });
                });


                function changeLocale(newLocale) {
                    previousLocale = locale;
                    locale = newLocale;

                    if (locale !== previousLocale) {
                        // Set the $rootScope property only if provided.
                        if (l20nProvider.localeProperty) {
                            $rootScope[l20nProvider.localeProperty] = locale;
                        }

                        localStorage.setItem(l20nProvider.localeStorageKey, newLocale);
                        documentL10n.requestLocales(newLocale);
                    }
                }

                function updateData() {
                    var event;

                    documentL10n.updateData.apply(documentL10n, arguments);

                    event = document.createEvent('HTMLEvents');
                    event.initEvent('l20n:dataupdated', true, true);
                    document.dispatchEvent(event);
                }

                return l20nService;
            };

            l20nProvider.$get.$inject = ['$rootScope', 'documentL10n'];
        })


        .directive('l20n', ['documentL10n', function (documentL10n) {
            /**
             * Since the attribute data-l10n-id could hold not the localization id itself but a string
             * to be evaluated and l20n doesn't place nice with it, we need to pre-evaluate the attribute
             * and pass it to the data-l10n-id attribute later. The data-l10n-id attribute is, in turn,
             * processed by the l10nId directive.
             */
            return function (scope, element, attrs) {
                attrs.$observe('l20n', function () {
                    // Remove possible previous listeners
                    document.removeEventListener('l20n:dataupdated', localizeCurrentNode);

                    // Prepare for the l10nId directive.
                    element.attr('data-l10n-id', attrs.l20n);

                    documentL10n.once(function () {
                        document.addEventListener('l20n:dataupdated', localizeCurrentNode);
                        localizeCurrentNode();
                    });

                    function localizeCurrentNode() {
                        documentL10n.localizeNode(element[0]);
                    }
                });
            };
        }])

        .value('documentL10n', document.l10n); // it's provided as value to be easily mocked in tests
})();
