document.addEventListener("DOMContentLoaded", function() {
    loadCountryList();
});

function loadCountryList() {
    fetch("data/countries.json") // A file containing a list of JSON files for each country
        .then(response => response.json())
        .then(data => {
            let countryList = document.querySelector(".sidebar ul");
            countryList.innerHTML = ""; // Clear existing list
            
            data.countries.forEach(country => {
                let listItem = document.createElement("li");
                let link = document.createElement("a");
                link.href = "#";
                link.textContent = country.name;
                link.onclick = () => loadCountryData(country.file);
                listItem.appendChild(link);
                countryList.appendChild(listItem);
            });
        })
        .catch(err => console.error("Error loading country list:", err));
}

function loadCountryData(filename) {
    fetch(`data/${filename}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("country-info").innerHTML = `
                <h2>${data.Countries}</h2>
                <p><strong>Visa Requirements:</strong> ${formatVisaRequirements(data["Visa Requirements"])}</p>
                <p><strong>Socket Type:</strong> ${data["Socket Type"]}</p>
                <p><strong>Card/Cash:</strong> ${data["Card/Cash"]}</p>
                <p><strong>Public Transport:</strong> ${data["Public Transport"]}</p>
                <p><strong>Uber/Taxi Services:</strong> ${data["Uber/Wolt/Yandex Taxi"]}</p>
                <p><strong>National Carrier:</strong> ${data["National Carrier"]}</p>
                <p><strong>Main Airports:</strong> ${data["Main Airports"].join(", ")}</p>
                <p><strong>Budget per day:</strong> ${data["Budget per day"]}</p>
                <p><strong>Weather:</strong> ${data["Weather"]}</p>
                <p><strong>Best Time to Visit:</strong> ${data["Best Time to Visit"]}</p>
                <p><strong>Emergency Number:</strong> ${data["Emergency Number"]}</p>
                <p><strong>Top Places to Visit:</strong> ${data["Top places to Visit"].join(", ")}</p>
                <p><strong>Currency & Exchange Rate:</strong> ${data["Currency & Exchange rate"]}</p>
            `;
        })
        .catch(err => console.error("Error loading country data:", err));
}

// Function to format Visa Requirements dynamically
function formatVisaRequirements(visaData) {
    if (typeof visaData === "object") {
        let formattedText = "";
        for (let key in visaData) {
            formattedText += `<strong>${key}:</strong> ${JSON.stringify(visaData[key], null, 2)}<br>`;
        }
        return formattedText;
    }
    return visaData;
}
