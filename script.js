// Function to load and display country data based on selection
function loadCountry(countryFile) {
    fetch(`data/${countryFile}`)
        .then(response => response.json())
        .then(data => {
            // Populate the country info dynamically
            const detailsContainer = document.getElementById('country-details');
            detailsContainer.innerHTML = ''; // Clear previous details

            // Set the country title
            const countryTitle = document.createElement('h2');
            countryTitle.textContent = data.Country;
            detailsContainer.appendChild(countryTitle);

            // Loop through the first-level keys in the JSON file and create corresponding sections
            for (const key in data) {
                if (data.hasOwnProperty(key) && key !== 'Country') {
                    const section = document.createElement('section');
                    section.classList.add('country-info-section');

                    const heading = document.createElement('h3');
                    heading.textContent = key.toUpperCase();
                    section.appendChild(heading);

                    const line = document.createElement('hr');
                    section.appendChild(line);

                    // Handle different data types (string, array, or nested object)
                    const content = document.createElement('p');
                    if (typeof data[key] === 'object') {
                        if (Array.isArray(data[key])) {
                            content.textContent = data[key].join(', ');
                        } else {
                            // If it's a nested object, display in a readable format
                            content.textContent = JSON.stringify(data[key], null, 2);
                        }
                    } else {
                        content.textContent = data[key];
                    }
                    section.appendChild(content);

                    detailsContainer.appendChild(section);
                }
            }
        })
        .catch(error => {
            console.error('Error loading country data:', error);
        });
}

// Function to load and display country list
function loadCountryList() {
    fetch('data/countries.json')
        .then(response => response.json())
        .then(countries => {
            const countryListContainer = document.getElementById('country-list');
            countryListContainer.innerHTML = ''; // Clear any existing country list

            countries.forEach(country => {
                const countryItem = document.createElement('li');
                const countryLink = document.createElement('a');
                countryLink.href = '#';
                countryLink.textContent = country.name;
                countryLink.onclick = () => loadCountry(country.file); // Pass the file name

                countryItem.appendChild(countryLink);
                countryListContainer.appendChild(countryItem);
            });
        })
        .catch(error => {
            console.error('Error loading country list:', error);
        });
}

// Call the function to load the country list on page load
document.addEventListener('DOMContentLoaded', () => {
    loadCountryList();
});
