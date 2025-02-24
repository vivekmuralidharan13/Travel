window.onload = function () {
    fetchCountries();
};

// Fetch countries from the JSON file and populate the dropdown
function fetchCountries() {
    fetch("data/countries.json")
        .then(response => response.json())
        .then(data => {
            let countryDropdown = document.getElementById("country-dropdown");

            // Clear the dropdown and add a default option
            countryDropdown.innerHTML = "<option value=''>Select a Country</option>";

            // Add country options to the dropdown
            data.forEach(country => {
                let option = document.createElement("option");
                option.value = country.filename;
                option.textContent = country.name;
                countryDropdown.appendChild(option);
            });
        })
        .catch(err => console.error("Error loading countries:", err));
}

// Load the country data dynamically based on the selected country
function loadCountryDataFromDropdown() {
    let dropdown = document.getElementById("country-dropdown");
    let selectedCountry = dropdown.value;

    if (selectedCountry) {
        loadCountryData(selectedCountry);
    }
}

// Load the country data dynamically based on the selected country
function loadCountryData(filename) {
    fetch(`data/${filename}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("country-title").textContent = data.Countries; // Update title

            // Update each field dynamically
            document.getElementById("visa-requirements").textContent = `Visa Requirements: ${data["Visa Requirements"]}`;
            document.getElementById("socket-type").textContent = `Socket Type: ${data["Socket Type"]}`;
            document.getElementById("card-cash").textContent = `Card/Cash: ${data["Card/Cash"]}`;
            document.getElementById("public-transport").textContent = `Public Transport: ${data["Public Transport"]}`;
            document.getElementById("uber-taxi").textContent = `Uber/Wolt/Yandex Taxi: ${data["Uber/Wolt/Yandex Taxi"]}`;
            document.getElementById("national-carrier").textContent = `National Carrier: ${data["National Carrier"]}`;
            document.getElementById("main-airports").textContent = `Main Airports: ${data["Main Airports"]}`;
            document.getElementById("budget-per-day").textContent = `Budget per day: ${data["Budget per day"]}`;
            document.getElementById("weather").textContent = `Weather: ${data["Weather"]}`;
            document.getElementById("best-time-to-visit").textContent = `Best Time to Visit: ${data["Best Time to Visit"]}`;
            document.getElementById("emergency-number").textContent = `Emergency Number: ${data["Emergency Number"]}`;
            document.getElementById("top-places-to-visit").textContent = `Top places to Visit: ${data["Top places to Visit"]}`;
            document.getElementById("currency-exchange-rate").textContent = `Currency & Exchange rate: ${data["Currency & Exchange rate"]}`;
        })
        .catch(err => console.error("Error loading country data:", err));
}
