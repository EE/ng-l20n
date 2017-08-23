/**
 * Author Michał Gołębiowski-Owczarek <michal.golebiowski@laboratorium.ee>
 * Author Mikołaj Dądela <mikolaj.dadela@laboratorium.ee>
 * Author Patryk Hes <patryk.hes@laboratorium.ee>
 * Part of CBN Polona - National Library of Poland
 * © 2012, 2013 Laboratorium EE
 */

(function () {
    'use strict';

    angular.module('testApp', ['ngL20n'])

        .config(['l20nProvider', function (l20nProvider) {
            l20nProvider.localeStorageKey = 'sandbox-locale';
            l20nProvider.localeProperty = 'sandboxLocale';
        }])
        
        .run(['$rootScope', 'documentL10n', 'l20n', function ($rootScope, documentL10n, l20n) {
            $rootScope.l20nId = 'objectsWithCount';
            $rootScope.data = {
                objectsNum: 102,
                testNumber: 0,
            };

            $rootScope.changeLocale = l20n.changeLocale;

            function setObjectsNum(number) {
                l20n.updateData({
                    objectsNum: number,
                });
            }

            $rootScope.$watch('data.objectsNum', function (newValue) {
                setObjectsNum(parseInt(newValue, 10) || 0);
            });

            documentL10n.ready(function () {
                setObjectsNum(parseInt($rootScope.data.objectsNum, 10) || 0);
            });
        }]);
})();
