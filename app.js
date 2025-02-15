const form = document.querySelector("form");
const getLocation = document.getElementById("getLocation");
const city = document.getElementById("city");
const weatherUpdate = document.getElementById("weatherUpdate");

const weatherRender = [];
form.addEventListener("submit", (e) => {
    e.preventDefault();
    getLocation.innerHTML = "Loading..."
    axios(`http://api.weatherapi.com/v1/current.json?key=6a291f122a5c47a1a89190002251502&q=${city.value}&aqi=no`)
        .then((res) => {
            let newWeather = `
                <div class="card mt-3" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${res.data.location.name}</h5>
                        <p class="card-text">${res.data.location.localtime}</p>
                        <div class="d-flex align-items-center">
                            <h2 class="card-text fs-3">${res.data.current.temp_c}°C</h2>
                            <img src="${res.data.current.condition.icon}" class="card-img-top" alt="weather-icon">
                        </div>
                        <p class="card-text">${res.data.current.condition.text}</p>
                    </div>
                </div>
            `;
            if (!weatherRender.includes(newWeather)) {
                weatherRender.unshift(newWeather);
                weatherUpdate.innerHTML = weatherRender.join("");
            }
        })
        .catch(() => {
            alert('No City Found.');
        }).finally(() => {
            getLocation.innerHTML = "Show Weather"
        })
});
