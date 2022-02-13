//calling the weather api 

let weather = {
    apiKey: "6bef152439f592d693d0470f35cb6fe6",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
   
   // to display the weather. I couldn't figure how to convert the weather to F instead of C 
   // Everytime I change something thinking it's the solution, it ends up calling the error function above ^ "No weather found"
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
   
   // to search for the weather in specific cities 
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
  // adding event listner for search city function 
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  

  weather.fetchWeather("Detroit");

  // for some reason, I couldn't get the weath to pull F, instead it would stick to C and the 5 day forcast was really tought to do
  // I kept learning and figuring out new ways to structure the code