(function () {
    "use strict";

    angular.module('appMaps', ['uiGmapgoogle-maps'])
    .config(
        ['uiGmapGoogleMapApiProvider', function(GoogleMapApiProviders) {
            GoogleMapApiProviders.configure({
                // china: true
            });
        }]
        )
    .service('weather', function ($http) {
        this.getCityWeather = function () {
            $http.get('api.openweathermap.org/data/2.5/weather?lat=48.856614&lon=2.3522219000000177$key=0559792372f5068cdb80ff2f1c3d1951').then(function (response){
                console.log(response.data);
            });
        };
    })
    .controller('mainCtrl', function(weather, $scope) {
        $scope.map = { center: { latitude: 47.0860214, longitude: 2.1641826}, zoom: 6 };

        weather.getCityWeather();
    })

})();