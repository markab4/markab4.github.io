$(document).ready(function () {
    // Get location
    navigator.geolocation.getCurrentPosition(success, error);

    function success(pos){
        let lat = pos.coords.latitude, long = pos.coords.longitude;
        weather(lat, long);
    }

    function error(){
        console.log('error getting location');
        let lat = 40.7282, long = -73.7949;
        weather(lat, long);
    }

    function weather(lat, long) {
        const URL = `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${long}`;
        $.getJSON(URL, function(data){
            console.log(data);
            updateDOM(data);
        })
    }

    function updateDOM(data) {
        let info = {
            city:       data.name,
            temp:       degrees(data.main.temp),
            desc:       data.weather[0].description,
            icon:       data.weather[0].icon,
            humidity:   data.main.humidity,
            cloud:      data.clouds.all,
            temp_max:   degrees(data.main.temp_max),
            temp_min:   degrees(data.main.temp_min),
            sunrise:    getProperTime(data.sys.sunrise),
            sunset:     getProperTime(data.sys.sunset),
            wind_gust:  kmToMiles(data.wind.gust),
            wind_speed: kmToMiles(data.wind.speed)
        };
        $(".city").html(info.city);
        $("#temp").html(info.temp);
        $("#desc").html(info.desc);
        $(".icon").attr('src', info.icon);
        $("#humidity").html(info.humidity);
        $("#cloud").html(info.cloud);
        $("#wind").html(info.wind_speed);
        if(!isNaN(info.wind_gust))
            $("#wind-gust").html(", gusts up to " +  info.wind_gust+ " mph");
        $("#temp_low").html(info.temp_min);
        $("#temp_max").html(info.temp_max);
        $("#sunrise").html(info.sunrise);
        $("#sunset").html(info.sunset);

        console.log(info);
    }
});

function degrees(cel){return Math.round(cel*9/5 + 32);}
function kmToMiles(km){return Math.round(km * 0.62137);}

function getProperTime(time){
    time = new Date(time*1000);
    return  time.getHours() - (time.getHours() < 12 ? 0 : 12) + ":" +
            leadingZero(time.getMinutes()) + ":" +
            leadingZero(time.getSeconds()) +
            (time.getHours() < 12 ? " am" : " pm");
}

function leadingZero(time) {
    return (time < 10) ? "0" + time : time;
}