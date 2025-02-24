document.addEventListener("DOMContentLoaded", function() {
    fetchCountries();
});

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
        });
}

function loadCountryDataFromDropdown() {
    let dropdown = document.getElementById("country-dropdown");
    let selectedCountry = dropdown.value;

    if (selectedCountry) {
        loadCountryData(selectedCountry);
    }
}

function loadCountryData(filename) {
    fetch(`data/${filename}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("country-title").textContent = data.title;
            document.getElementById("country-info").textContent = data.description;
        });
}
