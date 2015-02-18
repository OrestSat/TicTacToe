/**
 * Created by Orest on 18.02.2015.
 */
var MyApp = angular.module("MyApp", []);

MyApp.controller("MainController", ["$scope", "$rootScope", function($scope, $rootScope){
    $scope.reset = function(){
        $scope.mover = true;
        $scope.count = 1;
        $scope.desk = [
            [{value: null, expanded: false},{value: null, expanded: false},{value: null, expanded: false}],
            [{value: null, expanded: false},{value: null, expanded: false},{value: null, expanded: false}],
            [{value: null, expanded: false},{value: null, expanded: false},{value: null, expanded: false}]
        ];
    };
    $scope.clear = function(){
        $scope.count = 1;
        angular.forEach( $scope.desk, function(items){
            angular.forEach(items, function(item){
                item.expanded = false;
            });
        });
    };
    $scope.reset();
    $rootScope.$on("countChanged", function(){
        if($scope.count === 3){
            alert($scope.mover + " WIN");
            $scope.reset();
        }
    });

    $scope.changeMover = function(){
        $scope.mover = !$scope.mover;
    };

    $scope.fillField = function(i, j){
        $scope.desk[i][j].value = $scope.mover;
        $scope.check(i, j);
        $scope.changeMover();
    };

    $scope.check = function(i, j){
        // top
        $scope.desk[i][j].expanded = true;
        $scope.checkLine(i, j, -1, 0);
        $scope.clear();
        // top-right
        $scope.desk[i][j].expanded = true;
        $scope.checkLine(i, j, -1, 1);
        $scope.clear();
        // right
        $scope.desk[i][j].expanded = true;
        $scope.checkLine(i, j, 0, 1);
        $scope.clear();
        // bottom-right
        $scope.desk[i][j].expanded = true;
        $scope.checkLine(i, j, 1, 1);
        $scope.clear();
    };

    $scope.checkLine = function(i, j, delta_i, delta_j){
        try{
            if ($scope.desk[i + delta_i][j + delta_j].value == $scope.mover) {
                $scope.desk[i + delta_i][j + delta_j].expanded = true;
                $scope.count += 1;
                $rootScope.$broadcast("countChanged");
                $scope.checkLine(i + delta_i, j + delta_j, delta_i, delta_j);
            }
        }
        catch(error) {
            $scope.checkReverse(i, j, delta_i, delta_j);
        }
    };
    $scope.checkReverse = function(i, j, delta_i, delta_j){
        try {
            if ($scope.desk[i - delta_i][j - delta_j].expanded) {
                $scope.checkReverse(i - delta_i, j- delta_j, delta_i, delta_j);
            } else {
                if ($scope.desk[i - delta_i][j - delta_j].value == $scope.mover) {
                    $scope.desk[i - delta_i][j - delta_j].expanded = true;
                    $scope.count += 1;
                    $rootScope.$broadcast("countChanged");
                    $scope.checkReverse(i - delta_i, j - delta_j, delta_i, delta_j);
                }
            }
        } catch(error){
            console.log("Out of range");
        }
    };
}]);