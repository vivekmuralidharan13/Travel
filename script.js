document.addEventListener("DOMContentLoaded", function() {
    fetch('data/countries.json')  // Corrected path
    .then(response => response.json())
    .then(data => {
        const dropdown = document.getElementById('country-dropdown');
        
        // Loop through countries in the JSON file and create <option> elements
        data.forEach(country => {
            const option = document.createElement('option');
            option.value = country.filename;  // Use the filename (e.g., 'USA.json')
            option.textContent = country.name;  // Use the country name
            dropdown.appendChild(option);
        });

        // Event listener to load country info when a country is selected
        dropdown.addEventListener('change', function() {
            const selectedCountryFile = dropdown.value;
            if (selectedCountryFile) {
                loadCountryData(selectedCountryFile);  // Adjusted to call the correct function
            } else {
                resetCountryInfo();  // Reset if no country is selected
            }
        });
    })
    .catch(error => {
        console.error('Error loading countries.json:', error);
    });
});

// Function to load and display the country information dynamically
function loadCountryData(countryFile) {
    fetch(`data/${countryFile}`)  // Ensure data files are under the 'data' folder
    .then(response => response.json())
    .then(countryData => {
        document.getElementById("country-title").textContent = countryData.Countries;  // Update title

        // Dynamically update the country info fields
        updateCountryInfo(countryData);
    })
    .catch(error => {
        console.error('Error loading country data:', error);
    });
}

// Function to update the country info sections dynamically
function updateCountryInfo(data) {
    function updateField(id, fieldData) {
        let fieldElement = document.getElementById(id);
        if (fieldElement) {
            fieldElement.textContent = fieldData || "Information not available.";
        }
    }

    updateField("visa-requirements", JSON.stringify(data["Visa Requirements"], null, 2));  // Nested data can be formatted
    updateField("socket-type", data["Socket Type"]);
    updateField("card-cash", data["Card/Cash"]);
    updateField("public-transport", data["Public Transport"]);
    updateField("uber-taxi", data["Uber/Wolt/Yandex Taxi"]);
    updateField("national-carrier", data["National Carrier"]);
    updateField("main-airports", data["Main Airports"].join(", "));
    updateField("budget-per-day", data["Budget per day"]);
    updateField("weather", data["Weather"]);
    updateField("best-time-to-visit", data["Best Time to Visit"]);
    updateField("emergency-number", data["Emergency Number"]);
    updateField("top-places-to-visit", data["Top places to Visit"].join(", "));
    updateField("currency-exchange-rate", data["Currency & Exchange rate"]);
}

// Reset function if no country is selected
function resetCountryInfo() {
    const sections = [
        "visa-requirements", "socket-type", "card-cash", "public-transport", "uber-taxi",
        "national-carrier", "main-airports", "budget-per-day", "weather", "best-time-to-visit",
        "emergency-number", "top-places-to-visit", "currency-exchange-rate"
    ];
    sections.forEach(sectionId => {
        document.getElementById(sectionId).textContent = "Select a country to view details.";
    });
}
