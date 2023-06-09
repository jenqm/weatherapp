let weather = {
    apiKey: "a7fddf3840eb7a8bbe92c7051a1e8ee9",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&units=metric&appid="
            + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },

    // divide: function (description) {
    //     let newDescription = description.split(" ");
    //     return newDescription.length > 1 ? newDescription[1] : newDescription;
    // },

    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;



    
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%"; 
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + "km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name +")"
        
        
    },
    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
}

document
.querySelector(".search button")
.addEventListener("click", function() {
    weather.search();
});

document
.querySelector(".search-bar")
.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        weather.search();
    }
});

weather.fetchWeather("Costa Rica");