function loadData() {
    const country = document.getElementById("country").value;
    fetch(`data/${country}.json`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("info").innerHTML = `
                <h2>${data.name}</h2>
                <p><strong>Capital:</strong> ${data.capital}</p>
                <p><strong>Currency:</strong> ${data.currency}</p>
                <p><strong>Best Time to Visit:</strong> ${data.best_time_to_visit}</p>
            `;
        })
        .catch(error => console.error("Error loading data:", error));
}
