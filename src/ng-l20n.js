/**
 * Author Michał Gołębiowski <michal.golebiowski@laboratorium.ee>
 * © 2012, 2013 Laboratorium EE
 *
 * License: MIT
 */

(function () {
    'use strict';

    angular.module('ngL20n', [])

        .provider('l20n', function l20nProvider() {

            var l20nProvider = this;

            l20nProvider.localeStorageKey = 'locale';

            l20nProvider.localeProperty = 'locale';

            l20nProvider.setChangeLocaleFunctionName = 'changeLocale';

            l20nProvider.$get = ['$rootScope', 'documentL10n', function ($rootScope, documentL10n) {
                $rootScope[l20nProvider.setChangeLocaleFunctionName] = function changeLocale(newLocale) {
                    // The main function for changing a locale. Everything gets triggered by changes
                    // made in this function.
                    $rootScope[l20nProvider.localeProperty] = newLocale;
                };

                // Dynamically change the site locale based on locale changes on $rootScope.
                documentL10n.once(function () {
                    $rootScope.$apply(function () {
                        if (!localStorage.getItem(l20nProvider.localeStorageKey)) {
                            // First visit to the site, set the default locale in localStorage.
                            localStorage.setItem(l20nProvider.localeStorageKey, documentL10n.supportedLocales[0]);
                        }

                        $rootScope[l20nProvider.localeProperty] = localStorage.getItem(l20nProvider.localeStorageKey);

                        $rootScope.$watch(l20nProvider.localeProperty, function (newLocale, oldLocale) {
                            // The second condition is checked only in the first watch handler invocation.
                            // If the locale negotiated by L20n is different from the one we stored
                            // in localStorage, prefer the one in localStorage.
                            if (newLocale !== oldLocale || documentL10n.supportedLocales[0] !== newLocale) {
                                localStorage.setItem(l20nProvider.localeStorageKey, newLocale);
                                documentL10n.requestLocales(newLocale);
                            }
                        });
                    });
                });

                return {
                    updateData: function updateData() {
                        var event;

                        documentL10n.updateData.apply(documentL10n, arguments);

                        event = document.createEvent('HTMLEvents');
                        event.initEvent('l20n:dataupdated', true, true);
                        document.dispatchEvent(event);
                    },
                };
            }];
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
