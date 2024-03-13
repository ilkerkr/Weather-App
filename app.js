const APIKEY = "f464dc6bb2d5433504244f39395d5075";
const URL = "https://api.openweathermap.org/data/2.5/";
const input = document.getElementById("input");
const city = document.getElementById("city");
const emoji = document.getElementById("emoji");
const derece = document.getElementById("derece");
const desc = document.getElementById("desc");
const minmax = document.getElementById("minmax");
const nem = document.getElementById("nem");
const main = document.getElementById("main");

window.addEventListener("load", () => {
  input.focus();
});

const enterQuery = (e) => {
  if (e.key === "Enter") {
    getResult(input.value);
    input.value = "";
  }
};

const getResult = async (cityName) => {
  let query = `${URL}weather?q=${cityName}&appid=${APIKEY}&units=metric&lang=tr`;
  // console.log(query);
  try {
    const res = await fetch(query);
    if (!res.ok) {
      throw new Error(`ERROR: ${res.status}`);
    }

    const data = await res.json();
    displayWeather(data);
  } catch (error) {
    displayErr(error);
  }
};

input.addEventListener("keypress", enterQuery);

const displayErr = (error) => {
  city.innerText = `${error.message}`;
  emoji.innerText = "Lütfen geçerli bir şehir giriniz!!";
  derece.innerText = "";
  desc.innerText = "";
  minmax.innerText = "";
  nem.innerText = "";
};

const displayWeather = (item) => {
  console.log(item);
  city.innerHTML = `${item.name} <sup>${item.sys.country}</sup>`;
  showEmoji(item);
  derece.innerText = `${Math.round(item.main.temp)} °C`;
  desc.innerText = `${item.weather[0].description}`;
  minmax.innerText = `${Math.round(item.main.temp_min)} °C / ${Math.round(
    item.main.temp_max
  )} °C`;
  nem.innerText = `Nem %${item.main.humidity}`;
  main.style.textShadow = "5px 5px 5px #59D5E0;";
  main.style.boxShadow = "-5px -5px 5px #59D5E0"
};

const showEmoji = (item) => {
  if (item.weather[0].main == "Clouds") {
    emoji.innerHTML = `<img src="img/clouds.png">`;
  } else if (item.weather[0].main == "Rain") {
    emoji.innerHTML = `<img src="img/rain.png">`;
  } else if (item.weather[0].main == "Clear") {
    emoji.innerHTML = `<img src="img/clear.png">`;
  } else if (item.weather[0].main == "Drizzle") {
    emoji.innerHTML = `<img src="img/drizzle.png">`;
  } else if (item.weather[0].main == "Mist") {
    emoji.innerHTML = `<img src="img/mist.png">`;
  }
};
