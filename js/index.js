function searchFoursquare(keyword) {
    let city = $('.city').data('city');
    location.href = "subPage/foursquare.html?city=" + city + "&keyword=" + keyword;
}