angular.module("myApp")

.service("httpService", ["$http", "$sce", function ($http, $sce) {

    this.getWeather = function (location) {
        return $http.jsonp($sce.trustAsResourceUrl("https://api.darksky.net/forecast/8b7fcec0153a9748c6c173387d0eb04e/" + location))
    }
    
    this.getLocation = function (address) {
        return $http.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + address +"&key=AIzaSyALickRD3QUk4QsYGgmzuXvPbx-uJ-q7WQ")
    }
}])