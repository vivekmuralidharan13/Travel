// Function to load country list from countries.json and populate the dropdown
document.addEventListener("DOMContentLoaded", function() {
    fetch('countries.json')  // Path to your countries.json file
    .then(response => response.json())
    .then(data => {
        const dropdown = document.getElementById('country-dropdown');
        
        // Loop through countries in the JSON file and create <option> elements
        data.forEach(country => {
            const option = document.createElement('option');
            option.value = country.filename;  // Use the filename (e.g., 'Australia.json')
            option.textContent = country.name;  // Use the country name
            dropdown.appendChild(option);
        });

        // Event listener to load country info when a country is selected
        dropdown.addEventListener('change', function() {
            const selectedCountryFile = dropdown.value;
            if (selectedCountryFile) {
                loadCountryInfo(selectedCountryFile);
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
function loadCountryInfo(countryFile) {
    fetch(countryFile)  // Fetch the corresponding country's JSON file
    .then(response => response.json())
    .then(countryData => {
        let countryInfoHtml = `<h2>${countryData.name}</h2>`;  // Assume 'name' is present in each country's JSON

        // Loop through the country data and display it
        Object.keys(countryData).forEach(key => {
            if (key !== 'name') {  // Exclude the 'name' key from being displayed
                countryInfoHtml += `
                    <div class="info-section">
                        <h3>${key}</h3>
                        <hr>
                        <p>${countryData[key]}</p>
                    </div>
                `;
            }
        });

        // Update the country info section in the main content area
        document.getElementById('country-info').innerHTML = countryInfoHtml;
    })
    .catch(error => {
        console.error('Error loading country data:', error);
    });
}
