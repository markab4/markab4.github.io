$(document).ready(function () {
    // Get location
    navigator.geolocation.getCurrentPosition(success, error);
    function success(pos){
        let lat = pos.coords.latitude,
            long = pos.coords.longitude;
        weather(lat, long);
    }

    function error(){
        console.log('error getting location');
    }

    function weather(lat, long) {
        const URL = `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${long}`;
        $.getJSON(URL, function(data){
            updateDOM(data);
        })
    }

    function updateDOM(data) {
        let city = data.name,
            temp = Math.round(data.main.temp * 9/5 + 32),
            desc = data.weather[0].description,
            icon = data.weather[0].icon;
        $("#city").html(city);
        $("#temp").html(temp);
        $("#desc").html(desc);
        $("#icon").attr('src', icon);
    }
});