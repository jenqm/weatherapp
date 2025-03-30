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
        .then((data) => {
            this.displayWeather(data);
            this.fetchBackgroundImage(city);  // Fetch background image based on city
        });
    },

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
    },

    fetchBackgroundImage: function(city) {
        fetch(`https://api.pexels.com/v1/search?query=${city}&per_page=1`, {
            headers: {
                Authorization: "7AUmc5NehjL52ubAOIQQ1V28RK0bXDMgPc9Zs84Tl4HpRrk7cuikooz7"
            }
        })
        .then((response) => response.json())
        .then((data) => {
            const imageUrl = data.photos[0].src.original;
            document.body.style.backgroundImage = `url(${imageUrl})`;
            document.body.style.backgroundSize = "cover";  // Make the background cover the page
            document.body.style.backgroundPosition = "center";  // Center the image
        })
        .catch((error) => {
            console.error("Error fetching background image:", error);
        });
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
