document.addEventListener("DOMContentLoaded", function() {
    // Fetch countries list from countries.json only once
    fetch('data/countries.json')
    .then(response => response.json())
    .then(countries => {
        const countryDropdown = document.getElementById('country-dropdown');
        
        // Clear any existing options to avoid duplication
        countryDropdown.innerHTML = ''; // Reset dropdown content
        
        // Populate country dropdown
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country.filename;
            option.textContent = country.name;
            countryDropdown.appendChild(option);
        });
    });

    // Handle country selection from the dropdown
    document.getElementById('country-dropdown').addEventListener('change', function(event) {
        const selectedCountry = event.target.value;
        if (selectedCountry) {
            loadCountryData(selectedCountry);
        }
    });

    // Load country data dynamically based on selected country
    function loadCountryData(countryFile) {
        fetch(`data/${countryFile}`)
        .then(response => response.json())
        .then(data => {
            // Update country name
            document.getElementById('country-name').textContent = data.Countries;

            // Update other fields (check if the field exists in data before updating)
            updateField('visa-requirements', data['Visa Requirements']);
            updateField('socket-type', data['Socket Type']);
            updateField('card-cash', data['Card/Cash']);
            updateField('public-transport', data['Public Transport']);
            updateField('uber-taxi', data['Uber/Wolt/Yandex Taxi']);
            updateField('national-carrier', data['National Carrier']);
            updateField('main-airports', data['Main Airports']);
            updateField('budget-per-day', data['Budget per day']);
            updateField('weather', data['Weather']);
            updateField('best-time-to-visit', data['Best Time to Visit']);
            updateField('emergency-number', data['Emergency Number']);
            updateField('top-places-to-visit', data['Top places to Visit']);
            updateField('currency-exchange-rate', data['Currency & Exchange rate']);
        });
    }

    // Update field content (for both text and arrays)
    function updateField(fieldId, fieldValue) {
        const field = document.getElementById(fieldId);
        
        if (field) {
            if (typeof fieldValue === 'object' && !Array.isArray(fieldValue)) {
                // Handle nested objects (e.g., Visa Requirements)
                field.innerHTML = formatNestedObject(fieldValue);
            } else if (Array.isArray(fieldValue)) {
                // Handle arrays (e.g., Top places to visit, Main airports)
                field.innerHTML = fieldValue.join(', ');
            } else {
                // Handle regular text content
                field.textContent = fieldValue || 'Not available';
            }
        }
    }

    // Format nested object to display (e.g., Visa Requirements)
    function formatNestedObject(obj) {
        let html = '';
        for (const [key, value] of Object.entries(obj)) {
            if (typeof value === 'object') {
                html += `<strong>${key}:</strong><ul>`;
                value.forEach(item => {
                    html += `<li>${item}</li>`;
                });
                html += '</ul>';
            } else {
                html += `<strong>${key}:</strong> ${value}<br>`;
            }
        }
        return html;
    }
});
