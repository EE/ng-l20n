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
        .run(['$rootScope', 'documentL10n', 'l20n', function ($rootScope, documentL10n, l20n) {
            $rootScope.data = {objectsNum: 102};
            $rootScope.l20nId = 'objectsWithCount';

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
