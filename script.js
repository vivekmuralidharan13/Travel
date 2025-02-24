// Function to Load Country Data on Click
function loadCountry(country) {
    // Load JSON data based on the country clicked
    fetch(`data/${country}.json`)
        .then(response => response.json())
        .then(data => {
            // Get the country details and display it on the page
            const countryInfo = document.getElementById("country-info");

            // Clear any existing content
            countryInfo.innerHTML = '';

            // Insert the country details dynamically
            const content = `
                <h2>${data.name}</h2>
                <img src="images/${country.toLowerCase()}.jpg" alt="${data.name}" style="width:100%; height:auto;">
                <p><strong>Capital:</strong> ${data.capital}</p>
                <p><strong>Currency:</strong> ${data.currency}</p>
                <p><strong>Best Time to Visit:</strong> ${data.best_time_to_visit}</p>
                <p><strong>Top Attractions:</strong> ${data.attractions.join(", ")}</p>
            `;
            countryInfo.innerHTML = content;
        })
        .catch(error => {
            console.error('Error fetching country data:', error);
            document.getElementById("country-info").innerHTML = `<p>Error loading country information.</p>`;
        });
}
