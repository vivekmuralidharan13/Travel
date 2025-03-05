function loadCountryData(filename) {
    fetch(`data/${filename}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("country-title").textContent = data.Countries; // Update title
            
            // Function to process nested objects if they exist
            function processNestedData(fieldId, fieldData) {
                let fieldElement = document.getElementById(fieldId);
                if (!fieldElement) return;
                
                if (typeof fieldData === "object") {
                    // Handle nested objects by formatting their contents
                    let formattedText = "";
                    for (let key in fieldData) {
                        if (typeof fieldData[key] === "object") {
                            formattedText += `${key}: ${JSON.stringify(fieldData[key], null, 2)}\n`;
                        } else {
                            formattedText += `${key}: ${fieldData[key]}\n`;
                        }
                    }
                    fieldElement.textContent = formattedText;
                } else {
                    // If it's a string or simple value, assign directly
                    fieldElement.textContent = fieldData;
                }
            }

            // Updating each field dynamically
            processNestedData("visa-requirements", data["Visa Requirements"]);
            processNestedData("socket-type", data["Socket Type"]);
            processNestedData("card-cash", data["Card/Cash"]);
            processNestedData("public-transport", data["Public Transport"]);
            processNestedData("uber-taxi", data["Uber/Wolt/Yandex Taxi"]);
            processNestedData("national-carrier", data["National Carrier"]);
            processNestedData("main-airports", data["Main Airports"].join(", "));
            processNestedData("budget-per-day", data["Budget per day"]);
            processNestedData("weather", data["Weather"]);
            processNestedData("best-time-to-visit", data["Best Time to Visit"]);
            processNestedData("emergency-number", data["Emergency Number"]);
            processNestedData("top-places-to-visit", data["Top places to Visit"].join(", "));
            processNestedData("currency-exchange-rate", data["Currency & Exchange rate"]);
        })
        .catch(err => console.error("Error loading country data:", err));
}
