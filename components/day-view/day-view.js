var app = angular.module("myApp");

app.controller("mainController", ["$scope", "httpService", "$routeParams", "$filter", function ($scope, httpService, $routeParams, $filter) {

    $scope.currentLocation;

    $scope.markLocation = function (x) {
        $scope.currentLocation = location
    }


    var location = $routeParams.areacode
        //Get request to convert zip/address to lat&lng
    httpService.getLocation($routeParams.areacode).then(function (response) {
        var latAndLng = response.data.results[0].geometry.location.lat + "," + response.data.results[0].geometry.location.lng
        $scope.locationOutput = response.data.results[0].formatted_address
        delete $scope.locationLookup


        //Get request for weather using lat&lng
        httpService.getWeather(latAndLng).then(function (response) {
            var weather = response.data
            var currentDay = $filter('date')(response.data.currently.time*1000, "EEEE")
            $scope.currentDay = currentDay

            //Code to change day view to selected day
            if ($routeParams.day === currentDay) {
                $scope.output = weather.currently
                $scope.showHourly = true;
            } else {
                $scope.showHourly = false;
                var date = new Date()
                var today = date.getDay()
                var daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
                var day = daysOfTheWeek.indexOf($routeParams.day)


                //if statement goes here to reset day on sunday
                $scope.output = weather.daily.data[day - today]
            }

            //$scope's for displaying weather data    
            $scope.hourly = weather.hourly.data
            $scope.forecast = weather.daily

            $scope.quantity = 6
            

        })
    })

}])