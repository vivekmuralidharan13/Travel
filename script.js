// Function to load country list from countries.json and populate the dropdown
document.addEventListener("DOMContentLoaded", function() {
    fetch('countries.json')  // Path to your countries.json file
    .then(response => response.json())
    .then(data => {
        const dropdown = document.getElementById('country-dropdown');
        
        // Loop through countries in the JSON file and create <option> elements
        Object.keys(data).forEach(country => {
            const option = document.createElement('option');
            option.value = country;
            option.textContent = country;
            dropdown.appendChild(option);
        });

        // Event listener to load country info when a country is selected
        dropdown.addEventListener('change', function() {
            const selectedCountry = dropdown.value;
            if (selectedCountry) {
                loadCountryInfo(selectedCountry, data);
            } else {
                document.getElementById('country-info').innerHTML = '<h2>Select a country to view details.</h2>';
            }
        });
    })
    .catch(error => {
        console.error('Error loading countries.json:', error);
    });
});

// Function to load and display the country information dynamically
function loadCountryInfo(country, data) {
    const countryInfo = data[country];
    let countryInfoHtml = `<h2>${country}</h2>`;

    // Loop through the available fields in the country's data
    Object.keys(countryInfo).forEach(key => {
        countryInfoHtml += `
            <div class="info-section">
                <h3>${key}</h3>
                <hr>
                <p>${countryInfo[key]}</p>
            </div>
        `;
    });

    // Update the country info section in the main content area
    document.getElementById('country-info').innerHTML = countryInfoHtml;
}
