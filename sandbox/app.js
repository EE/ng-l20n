/**
 * Author Michał Gołębiowski <michal.golebiowski@laboratorium.ee>
 * Author Mikołaj Dądela <mikolaj.dadela@laboratorium.ee>
 * Author Patryk Hes <patryk.hes@laboratorium.ee>
 * Part of CBN Polona - National Library of Poland
 * © 2012, 2013 Laboratorium EE
 */

(function () {
    'use strict';

    angular.module('testApp', ['ngL20n'])
        .run(function ($rootScope, documentL10n, l20n) {
            $rootScope.state = {};
            $rootScope.l20nId = 'objectsWithCount';

            documentL10n.addEventListener('ready', function () {
                l20n.init();

                // TODO get this from server
                l20n.updateData({
                    search: {
                        objectsNum: 43089,
                    },
                });
            });
        });
})();
