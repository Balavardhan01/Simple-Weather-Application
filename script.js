const searchBtn = document.getElementById("button");
const input = document.getElementById("input");

const temperatureElem = document.querySelector(".temperature");
const locationElem = document.querySelector(".location");
const timeElem = document.querySelector(".time");
const dayElem = document.querySelector(".day");
const dateElem = document.querySelector(".date");
const conditionElem = document.querySelector(".condition");
const logoImg = document.querySelector(".logo img");

searchBtn.addEventListener("click", async () => {
    const location = input.value;
    if (location !== "") {
        const data = await fetchWeather(location);
        if (data !== null) {
            updateDOM(data);
        }
        input.value = "";
    }
});

function updateDOM(data) {
    const temperature = data.current.temp_c;
    const location = data.location.name;
    const timeDate = data.location.localtime;
    const [date, time] = timeDate.split(" ");
    const condition = data.current.condition.text;
    const logo = data.current.condition.icon;

    temperatureElem.textContent = `${temperature} °C`;
    locationElem.textContent = location;
    timeElem.textContent = time;
    dateElem.textContent = date;
    conditionElem.textContent = condition;
    logoImg.src = "https:" + logo;

    
}

async function fetchWeather(location) {
    const url = `https://api.weatherapi.com/v1/current.json?key=850cf5507bb349129e395928250207&q=${location}&aqi=no`;
    try {
        const response = await fetch(url);
        if (response.status === 404) {
            alert("Location not found!");
            return null;
        } else if (response.ok) {
            const json = await response.json();
            return json;
        }
    } catch (err) {
        console.error("Error fetching data:", err);
        alert("Something went wrong. Try again.");
        return null;
    }
}
