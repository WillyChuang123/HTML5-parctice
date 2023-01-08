let cityData = [
    {name:"",lat:"",lon:""},
    {name:"台北",lat:25.0856513,lon:121.421409},
    {name:"台中",lat:24.1852333,lon:120.4946381},
    {name:"高雄",lat:22.7000444,lon:120.0508691},
];
$(function(){
    for(let x=0; x<cityData.length; x++){
        $("#citySelect").append(`<option value='${x}'>${cityData[x].name}</option>`);
    }
    $("#citySelect").on("change", loadServerData);
    $("#currentLocationBtn").on("click", loadServerData);
});

function loadServerData(){
    $("#result").empty();
    if(this.value==0) return;
    let weatherAPI_URL = "https://api.openweathermap.org/data/2.5/weather?";
    let weatherMapAPIKey = "1470a40147286d48568874cc439b15e7";
    $.getJSON(weatherAPI_URL,{ // user select get value x
        lat:cityData[this.value].lat,
        lon:cityData[this.value].lon,
        appid:weatherMapAPIKey,
        units:'metric',
        lang:'zh_tw'
    })
    .done(function(data){
        $("#result").append(`<p>氣溫：${data.main.temp_min} ~ ${data.main.temp_max}</p>`);
        $("#result").append(`${data.name}`);
        $("#result").append(`<p><img 
        src='https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png'>
        ${data.weather[0].description}</p>`);
    })
    .fail(function(){ console.log("Error");})
    .always(function(){ console.log("Always");});
}

