const apiKey = "3e88f8b97c56a46e90080ba9aa6d89e8";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const city_name = document.querySelector(".search_box input");
const search_btn = document.querySelector(".search");
const weathericon = document.querySelector(".weather_icon");
const mic_btn = document.querySelector(".mic");

async function startvoiceinput() {
    const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.start();

    recognition.onresult = function(event) {
        const speechResult = event.results[0][0].transcript;
        check_weather(speechResult);
    };

    recognition.onerror = function(event) {
        alert('Speech recognition error detected: ');
    };
}

async function check_weather(city){
    const response = await fetch (apiUrl + city + `&appid=${apiKey}`);
    if(response.status == 404){
        document.querySelector(".error").style.display="block";
        document.querySelector(".weather").style.display="none";
    }
    else{
        var data = await response.json();


        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C" ;
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind_speed").innerHTML = data.wind.speed + "km/hr";

        if(data.weather[0].main == "Clouds"){
            weathericon.src = "images/cloudy.webp";
        }
        else if(data.weather[0].main == "Clear"){
            weathericon.src = "images/clear.jpg";
        }
        else if(data.weather[0].main == "Rain"){
            weathericon.src = "images/rainy.png";
        }
        else if(data.weather[0].main == "Mist"){
            weathericon.src = "images/misty.webp";
        }
        else if(data.weather[0].main == "Snow"){
            weathericon.src = "images/snowy.webp";
        }
        else{
            weathericon.src = "images/weather_icon.png";
        }
        
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

    }
    
}



mic_btn.addEventListener("click" , ()=>{
    startvoiceinput();
})

search_btn.addEventListener("click", (event)=>{
    check_weather(city_name.value);
})