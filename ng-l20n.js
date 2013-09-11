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
            $rootScope.changeLocale = function changeLocale(newLocale) {
                // The main function for changing a locale. Everything gets triggered by changes
                // made in this function.
                $rootScope.locale = newLocale;
            };

            // Dynamically change the site locale based on $rootScope.locale changes.
            documentL10n.once(function () {
                $rootScope.$apply(function () {
                    $rootScope.$watch('locale', function (newLocale) {
                        if (newLocale) { // it might be undefined
                            localStorage.setItem('locale', newLocale);
                            documentL10n.requestLocales(newLocale);
                        }
                    });

                    if (!localStorage.getItem('locale')) {
                        // First visit to the site, set the default locale in localStorage.
                        localStorage.setItem('locale', documentL10n.supportedLocales[0]);
                    }

                    $rootScope.locale = localStorage.getItem('locale');

                    // If the locale negotiated by L20n is different from
                    // the one we stored in localStorage, prefer the one in
                    // the localStorage
                    if (documentL10n.supportedLocales[0] !== $rootScope.locale) {
                        documentL10n.requestLocales($rootScope.locale);
                    }
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
        }])

        .directive('l20n', ['$compile', '$timeout', 'documentL10n', function ($compile, $timeout, documentL10n) {
            /**
             * Since the attribute data-l10n-id could hold not the localization id itself but a string
             * to be evaluated and l20n doesn't place nice with it, we need to pre-evaluate the attribute
             * and pass it to the data-l10n-id attribute later. The data-l10n-id attribute is, in turn,
             * processed by the l10nId directive.
             */
            return {
                priority: 1000,
                link: function (scope, element, attrs) {
                    var originalHTML = element[0].outerHTML,
                        localizesWaiting = 0;

                    attrs.$observe('l20n', function () {
                        documentL10n.once(function () {
                            document.addEventListener('l20n:dataupdated', localizeCurrentNode);
                            localizeCurrentNode();
                        });

                        function localizeCurrentNode(alreadyCounted) {
                            var phase = scope.$root.$$phase;
                            if (phase === '$apply' || phase === '$digest') {
                                if (localizesWaiting === 0) {
                                    // If one function is already waiting, no reason to repeat its actions.
                                    if (!alreadyCounted) {
                                        localizesWaiting++;
                                    }
                                    $timeout(localizeCurrentNode.bind(null, true), 100);
                                }

                                return;
                            }

                            scope.$apply(function () {
                                // Compile the original element to be able to re-create all bindings.
                                var originalElement = angular.element(originalHTML);

                                // Prepare for the l10nId directive.
                                element.attr('data-l10n-id', attrs.l20n);
                                originalElement.attr('data-l10n-id', attrs.l20n);

                                // Localize the newly restored element.
                                documentL10n.localizeNode(originalElement[0]);

                                // Re-compile element contents to re-create the bindings.
                                $compile(originalElement.contents())(scope);
                                element.html('');
                                element.append(originalElement.contents());

                                localizesWaiting--;
                            });
                        }
                    });
                },
            };
        }])

        .value('documentL10n', document.l10n); // it's provided as value to be easily mocked in tests

})();
