'use strict';

var app = angular.module('myApp');

app.controller('BrcaController', 
    ['$scope', '$http', '$q',
    function clinicController ($scope, $http, $q) {

    console.log('loaded BRCA controller');        
    $scope.context = 'BRCA';

    $scope.search = function () {

        $scope.displayFields = ['Gene_symbol', 'Genomic_Coordinate', 'HGVS_cDNA', 'HGVS_protein',  'BIC_Nomenclature', 'Clinical_significance'];
        $scope.db = 'brca';

        var condition;
        if ($scope.string) {
            var test = " LIKE '%" + $scope.string + "%'";
            var string_condition = $scope.displayFields.join(test + ' OR '); 
            condition = string_condition + test;    
        }

        var SQL = "SELECT * from " + $scope.db;

        if (condition) { SQL = SQL + " WHERE " + condition }
        
        console.log("SQL: " + SQL);

        //var url = "http://limsdev06.bcgsc.ca/beacon/brca/search?format=json&string=" + $scope.string;
        var url = "/brca/search?format=json&string=" + $scope.string;

        $http.get(url)
        .then ( function (response) {
            console.log("Found " + response.data.length + ' records');

            $scope.dataSet = response.data;
            return;
        });
    }

}]);
