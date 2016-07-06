(function () {
    "use strict";

    angular.module('appMaps', ['uiGmapgoogle-maps'])
    .config(
        ['uiGmapGoogleMapApiProvider', function(GoogleMapApiProviders) {
            GoogleMapApiProviders.configure({
                // china: true
                // enlever les controles + disable le zoom souris
            });
        }]
        )
    .service('weather', function ($http) {
        this.getCitiesWeather = function (successCallback) {
            $http.get('http://api.openweathermap.org/data/2.5/group?id=6455259,6454414,6447142,6448047,2973783&APPID=0559792372f5068cdb80ff2f1c3d1951').then(function (response){
                // transformer en degres Celsius
                var data = response.data.list;
                successCallback(data);
                        // position: {lat: element.coord.lat, lng: element.coord.lon},
                        // title: element.name,
                        // icon: 'http://openweathermap.org/img/w/'+element.weather[0].icon+'.png'
            });
                // console.log(data);
            // return data;
        };
    })
    .controller('mainCtrl', function(weather, $scope) {
        $scope.map = { center: { latitude: 47.0860214, longitude: 2.1641826}, zoom: 6 };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position){
                $scope.userLatLng = {lat: position.coords.latitude, lng: position.coords.longitude};
            });
        }

        weather.getCitiesWeather(function (data) {
            
            var coordsObj = [];

            for (var key in data)
            {
                coordsObj.push({
                    latitude: data[key].coord.lat,
                    longitude: data[key].coord.lon,
                    id: data[key].id,
                })
            }
            $scope.citiesData = coordsObj;

        });

    })

})();