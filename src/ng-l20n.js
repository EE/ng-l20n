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

            var previousLocale, locale;
            var l20nProvider = this;

            l20nProvider.localeStorageKey = 'ngL20nLocale';

            l20nProvider.$get = function ($rootScope, $timeout, documentL10n) {
                var l20nService = new function L20n() {
                    this.updateData = updateData;
                    this.changeLocale = changeLocale;
                };

                // Initialize to locale from localStorage if one exist. Otherwise, fall back
                // to the locale negotiated by L20n.
                documentL10n.once(function () {
                    $rootScope.$apply(function () {
                        l20nService.changeLocale(
                            localStorage.getItem(l20nProvider.localeStorageKey) ||
                            documentL10n.supportedLocales[0]
                        );
                    });
                });


                function changeLocale(newLocale) {
                    previousLocale = locale;
                    locale = newLocale;

                    if (locale !== previousLocale) {
                        localStorage.setItem(l20nProvider.localeStorageKey, locale);

                        // Set the $rootScope property only if provided.
                        if (l20nProvider.localeProperty) {
                            // The locale needs to be set on the `ready` event since
                            // `requestLocales` can be asynchronous. We can't just use
                            // `documentL10n.ready`, though as context once marked ready is never
                            // unmarked as such. :-( Thus, we have to register the handler before
                            // the `requestLocale` invocation; otherwise we have no way of knowing
                            // if the event already fired.
                            documentL10n.addEventListener('ready', setRootScopeLocale);
                        }

                        documentL10n.requestLocales(locale);
                    }

                    function setRootScopeLocale() {
                        $timeout(function () {
                            documentL10n.removeEventListener('ready', setRootScopeLocale);
                            $rootScope[l20nProvider.localeProperty] = locale;
                        });
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

            l20nProvider.$get.$inject = ['$rootScope', '$timeout', 'documentL10n'];
        })


        .directive('l20n', ['documentL10n', function (documentL10n) {
            /**
             * Since the attribute data-l10n-id might hold not the localization id itself but
             * a string to be evaluated and L20n.js doesn't play nice with it, we need to
             * pre-evaluate the attribute and pass it to the data-l10n-id attribute later. The
             * data-l10n-id attribute is, in turn, processed by L20n.js.
             */
            return {
                restrict: 'A',

                link: function (__scope, element, attrs) {
                    function localizeCurrentNode() {
                        // l20n can't handle localization of comment nodes, throwing an error in
                        // the process. Do not pass comment nodes to l20n for localization.
                        if (element[0].nodeType === Node.COMMENT_NODE) {
                            return;
                        }
                        documentL10n.localizeNode(element[0]);
                    }

                    attrs.$observe('l20n', function (l20n) {
                        // Remove possible previous listeners. Do it regardless if data-l20n is
                        // empty or not.
                        document.removeEventListener('l20n:dataupdated', localizeCurrentNode);

                        // Checking if the attribute is truthy prevents from passing an empty
                        // translation key to l20n. If an empty key is used on any node then l20n
                        // will translate neither that node nor any of its following nodes in the
                        // entire document. In the worst case scenario this may lead to a permanent
                        // l20n failure if the empty key occurs at the very beginning of the
                        // document.
                        if (!l20n) {
                            element.removeAttr('data-l10n-id');
                            return;
                        }

                        // Prepare for the L20n.js translating the element.
                        element.attr('data-l10n-id', l20n);

                        documentL10n.once(function () {
                            document.addEventListener('l20n:dataupdated', localizeCurrentNode);
                            localizeCurrentNode();
                        });
                    });
                },
            };
        }])

        // It's provided as value to be easily mocked in tests.
        .value('documentL10n', document.l10n);
})();
