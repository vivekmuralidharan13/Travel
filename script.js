// Function to Load Country Data on Click
function loadCountry(country) {
    fetch(`data/${country}.json`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("country-info").innerHTML = `
                <h2>${data.name}</h2>
                <img src="images/${country.toLowerCase()}.jpg" alt="${data.name}">
                <p><strong>Capital:</strong> ${data.capital}</p>
                <p><strong>Currency:</strong> ${data.currency}</p>
                <p><strong>Best Time to Visit:</strong> ${data.best_time_to_visit}</p>
                <p><strong>Top Attractions:</strong> ${data.attractions.join(", ")}</p>
            `;
        });
}
