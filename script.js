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

// Function to load country information
function loadCountry(countryFile) {
    fetch(`data/${countryFile}`)
        .then(response => response.json())
        .then(countryInfo => {
            const countryInfoContainer = document.getElementById('country-info');
            countryInfoContainer.innerHTML = ''; // Clear existing content

            // Add country title
            const title = document.createElement('h2');
            title.textContent = countryInfo.Countries;
            countryInfoContainer.appendChild(title);

            // Add country info sections dynamically
            for (let key in countryInfo) {
                if (key !== 'Countries') {
                    const section = document.createElement('section');
                    const sectionTitle = document.createElement('h3');
                    sectionTitle.textContent = key.toUpperCase();
                    section.appendChild(sectionTitle);

                    const line = document.createElement('hr');
                    section.appendChild(line);

                    const sectionContent = document.createElement('p');
                    sectionContent.textContent = JSON.stringify(countryInfo[key], null, 2); // Pretty print JSON content
                    section.appendChild(sectionContent);

                    countryInfoContainer.appendChild(section);
                }
            }
        })
        .catch(error => {
            console.error('Error loading country info:', error);
        });
}

// Call the function to load the country list on page load
document.addEventListener('DOMContentLoaded', () => {
    loadCountryList();
});
