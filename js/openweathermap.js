$(function () {

    let $wrapper = $('.wrapper'),
        $panel = $wrapper.find('.panel'),
        $city = $panel.find('#city'),
        $weather = $panel.find('.weather'),
        $group = $panel.find('.group'),
        $dt = $group.find('#dt'),
        $description = $group.find('#description'),
        $wind = $group.find('#wind'),
        $humidity = $group.find('#humidity'),
        $temperature = $weather.find('#temperature'),
        $temp = $temperature.find('#temp'),
        $icon = $temp.find('#condition'),
        $tempNumber = $temp.find('#num'),
        $celsius = $temp.find('#celsius'),
        $forecast = $weather.find('#forecast'),
        $search = $wrapper.find('search'),
        $form = $search.find('form'),
        $button = $form.find('#button'),
        $nav = $('#gnb a');

    let tempCity;

    getWeather("tokyo");

    function getWeather(keyword) {

        tempCity = keyword;

        let requestWeather = $.ajax({
            dataType: 'json',
            url: 'http://api.openweathermap.org/data/2.5/weather',
            data: {
                q: keyword,
                units: 'metric',
                appid: openWeatherKeyDecrypted.toString(CryptoJS.enc.Utf8)
            }
        });
        let requestForecast = $.ajax({
            dataType: 'json',
            url: 'http://api.openweathermap.org/data/2.5/forecast',
            data: {
                q: keyword,
                units: 'metric',
                cnt: '6',
                appid: openWeatherKeyDecrypted.toString(CryptoJS.enc.Utf8)
            }
        });

        $celsius.removeClass('active').attr("href", '#');
        $icon.removeClass();
        $button.removeClass().addClass('button transparent');

        requestWeather.done(function (data) {

            if (data.cod === '404') {
                setBackground('color404', 'button404');
                alert('city not found');
                getWeather(tempCity);

            }

            let dt = new Date(data.dt * 1000).toString().split(' ');

            let title = data.sys.country
                ? data.name + ', ' + data.sys.country
                : data.name;

            $city.html(title);
            $city.attr("data-city", data.name);
            $tempNumber.html(Math.round(data.main.temp));
            $description.html(titleCase(data.weather[0].description));
            $wind.html('Wind: ' + data.wind.speed + ' mph');
            $humidity.html('Humidity ' + data.main.humidity + '%');
            $dt.html(fullDay(dt[0]) + ' ' + dt[4].substring(0, 5));

            $celsius.on('click', toCelsius);

            function toCelsius() {
                $(this).addClass('active').removeAttr('href');
                $tempNumber.html(Math.round((data.main.temp - 32) * (5 / 9)));
            }

            // Weather Icon
            switch (data.weather[0].icon) {
                case '01d':
                    $icon.addClass('fas fa-sun');
                    break;
                case '02d':
                    $icon.addClass('fas fa-cloud-sun');
                    break;
                case '01n':
                    $icon.addClass('fas fa-moon');
                    break;
                case '02n':
                    $icon.addClass('fas fa-cloud-moon');
                    break;
            }

            switch (data.weather[0].icon.substr(0, 2)) {
                case '03':
                    $icon.addClass('fas fa-cloud');
                    break;
                case '04':
                    $icon.addClass('fas fa-cloud-meatball');
                    break;
                case '09':
                    $icon.addClass('fas fa-cloud-sun-rain');
                    break;
                case '10':
                    $icon.addClass('fas fa-cloud-showers-heavy');
                    break;
                case '11':
                    $icon.addClass('fas fa-poo-storm');
                    break;
                case '13':
                    $icon.addClass('far fa-snowflake');
                    break;
                case '50':
                    $icon.addClass('fas fa-smog');
                    break;
            }
        });

        requestForecast.done(function (data) {

            $celsius.on('click', toCelsius);

            let forecast = [];
            let length = data.list.length;
            for (let i = 1; i < length; i++) {
                forecast.push({
                    date: new Date(data.list[i].dt * 1000).toString().split(' ')[0],
                    celsius: {
                        high: Math.round(data.list[i].main.temp_max),
                        low: Math.round(data.list[i].main.temp_min),
                    },
                });
            }

            function toCelsius() {
                doForecast('celsius');
            }

            function doForecast(unit) {
                let arr = [];
                let length = forecast.length;
                for (let i = 0; i < length; i++) {
                    arr[i] = ("<div class='block'><h3 class='secondary'>" + forecast[i].date + "</h3><h2 class='high'>" + forecast[i][unit].high + "</h2><h4 class='secondary'>" + forecast[i][unit].low + "</h4></div>");
                }
                $forecast.html(arr.join(''));
            }

            doForecast('celsius');
        });
    }

    $form.submit(function (event) {
        let keyword = $('#search').val();
        let keywordLength = keyword.length;
        if (keywordLength) getWeather(keyword);
        event.preventDefault();
    });

    $nav.click(function (event) {
        let keyword = $(this).data("city");
        getWeather(keyword);
        event.preventDefault();
        $nav.children('i').removeClass();
        $(this).children('i').addClass('fa fa-suitcase');
    })

});

function titleCase(str) {
    return str.split(' ').map(function (word) {
        return word[0].toUpperCase() + word.substring(1);
    }).join(' ');
}

function fullDay(str) {
    switch (str) {
        case 'Tue':
            return 'Tuesday';
        case 'Wed':
            return 'Wednesday';
        case 'Thu':
            return 'Thursday';
        case 'Sat':
            return 'Saturday';
        default:
            return str + 'day';
    }
}
