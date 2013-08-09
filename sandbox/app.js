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
        .run(function ($rootScope, l20n) {
            $rootScope.data = {objectsNum: 102};
            $rootScope.l20nId = 'objectsWithCount';

            l20n.init();

            function setObjectsNum(number) {
                l20n.context.updateData({
                    objectsNum: number,
                });
                $(document).trigger('l20n:dataupdated');
            }

            $rootScope.$watch('data.objectsNum', function (newValue) {
                setObjectsNum(parseInt(newValue, 10) || 0);
            });

            l20n.context.ready(function () {
                setObjectsNum(parseInt($rootScope.data.objectsNum, 10) || 0);
            });
        });
})();
