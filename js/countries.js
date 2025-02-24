document.addEventListener("DOMContentLoaded", function() {
    fetchCountries();
});

function fetchCountries() {
    fetch("data/countries.json")
        .then(response => response.json())
        .then(data => {
            let countryList = document.getElementById("country-list");
            countryList.innerHTML = ""; // Clear list

            data.forEach(country => {
                let li = document.createElement("li");
                li.textContent = country.name;
                li.addEventListener("click", () => loadCountryData(country.filename));
                countryList.appendChild(li);
            });
        });
}

function loadCountryData(filename) {
    fetch(`data/${filename}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("country-title").textContent = data.title;
            document.getElementById("country-info").textContent = data.description;
        });
}
