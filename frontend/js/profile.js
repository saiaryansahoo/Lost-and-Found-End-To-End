document.addEventListener("DOMContentLoaded", function() {
    loadUserProfile();
});

// Function to load user profile data
function loadUserProfile() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        document.getElementById("username").textContent = `Username: ${user.username}`;
        document.getElementById("email").textContent = `Email: ${user.email}`;
    } else {
        document.getElementById("username").textContent = "Username: Guest";
        document.getElementById("email").textContent = "Email: N/A";
    }
}

// Logout function
function logout() {
    localStorage.removeItem("user");
    alert("Logged out successfully!");
    window.location.href = "index.html";
}
