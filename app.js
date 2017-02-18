var app = angular.module("myApp", ["angular-skycons", "ngRoute"]);



app.config(["$routeProvider", function ($routeProvider) {

    $routeProvider
        .when("/:areacode/:day", {
            templateUrl: "components/day-view/day-view.html",
            controller: "mainController"
        
        })
        .when("/about", {
        templateUrl: "components/about/about.html",
        controller: "aboutController"
    })
        .otherwise({
            redirectTo: "/Home"
        });
    
        
}]);

