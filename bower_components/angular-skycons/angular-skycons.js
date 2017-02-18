var angularSkycons = angular.module("angular-skycons", []);


angularSkycons.directive("skycon", function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            icon: "=",
            size: "=",
            animated: "=",
            color: "="
        },
        link: function (scope, element, attrs) {

            // make a canvas for our icon
            var canvas = document.createElement("canvas");

            // set the CSS class from attribute
            if (!attrs.class) {
                canvas.className = "";
            } else {
                canvas.className = attrs.class;
            }

            // set default color if "color" attribute not present
            var config = {
                color: scope.color || "white"
            };

            var skycons = new Skycons(config);

            // watch the size property from the controller
            scope.$watch("size", function (newVal, oldVal) {
                if (newVal) {
                    canvas.height = newVal;
                    canvas.width = newVal;
                } else {
                    canvas.height = scope.size || 64;
                    canvas.width = scope.size || 64;
                }
            }, true);

            // add the animation
            skycons.add(canvas, scope.icon);

            // watch the icon property from the controller for changes
            scope.$watch("icon", function () {
                skycons.set(canvas, scope.icon);
            }, true);

            // watch the color property from the controller for changes
            scope.$watch("color", function () {

                if (scope.icon === "clear-day") {
                    skycons.color = "#f4d316"
                } else if (scope.icon === "clear-night") {
                    skycons.color = "lightgrey"
                } else if (scope.icon === "rain") {
                    skycons.color = "#1E8BFF"
                } else if (scope.icon === "snow") {
                    skycons.color = "#8AC646"
                } else if (scope.icon === "sleet") {
                    skycons.color = "#8AC646"
                } else if (scope.icon === "wind") {
                    skycons.color = "#8E6D95"
                } else if (scope.icon === "fog") {
                    skycons.color = "orange"
                } else if (scope.icon === "cloudy") {
                    skycons.color = "#CA61DF"
                } else if (scope.icon === "partly-cloudy-day") {
                    skycons.color = "#ABE2FF"
                } else if (scope.icon === "partly-cloudy") {
                    skycons.color = "#ABE2FF"
                } else if (scope.icon === "partly-cloudy-night") {
                    skycons.color = "#ABE2FF"
                } else if (scope.icon === "hail") {
                    skycons.color = "#8AC646"
                } else if (scope.icon === "thunderstorm") {
                    skycons.color = "yellow"
                } else if (scope.icon === "tornado") {
                    skycons.color = "red"
                } else {
                    skycons.color = "white"
                }

            }, true);

            if (scope.animated === "false" || scope.animated === false) {
                skycons.pause();
            } else {
                skycons.play();
            }

            if (element[0].nodeType === 8) {
                element.replaceWith(canvas);
            } else {
                element[0].appendChild(canvas);
            }

            scope.$on("$destroy", function () {
                skycons.remove(canvas);
                if (skycons.list.length === 0) {
                    skycons.pause(canvas);
                }
            });
        }
    };
});