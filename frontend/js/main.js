document.addEventListener("DOMContentLoaded", function() {
    console.log("Lost & Found System Loaded");

    // Check if the user is logged in
    const user = localStorage.getItem("user");
    if (user) {
        console.log("User logged in:", JSON.parse(user));
    } else {
        console.log("No user logged in");
    }
});

// Function to navigate to different pages
function navigateTo(page) {
    window.location.href = `./${page}.html`;
}
