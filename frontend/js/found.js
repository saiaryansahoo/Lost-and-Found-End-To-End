document.addEventListener("DOMContentLoaded", function () {
    const foundForm = document.getElementById("found-form");

    if (!foundForm) return; // Ensure the form exists before adding an event listener

    foundForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const submitButton = document.querySelector(".submit-btn");
        submitButton.disabled = true; // Prevent multiple submissions

        const name = document.getElementById("name").value.trim();
        const location = document.getElementById("location").value.trim();
        const contactNumber = document.getElementById("contactNumber").value.trim();

        // Basic validation
        if (!name || !location || !contactNumber) {
            alert("All fields are required!");
            submitButton.disabled = false;
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/found", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, location, contactNumber })
            });

            if (response.ok) {
                alert("Found item reported successfully!");
                window.location.href = "index.html"; // Redirect after submission
            } else {
                alert("Error reporting found item.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            submitButton.disabled = false; // Re-enable button after submission
        }
    });
});
