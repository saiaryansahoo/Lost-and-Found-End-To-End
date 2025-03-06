document.getElementById("found-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const itemName = document.getElementById("itemName").value;
    const location = document.getElementById("location").value;
    const contactInfo = document.getElementById("contactInfo").value;

    fetch("http://localhost:8080/api/found", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemName, location, contactInfo })
    })
    .then(response => response.json())
    .then(data => alert("Found Item Reported!"))
    .catch(error => console.error("Error:", error));
});
