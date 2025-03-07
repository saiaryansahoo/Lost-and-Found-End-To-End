document.addEventListener("DOMContentLoaded", function () {
    checkAuth(); // Ensure user is logged in
    loadUserProfile();
});

// Function to check authentication and redirect if not logged in
function checkAuth() {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.replace("login.html"); // Redirect to login if not authenticated
    }
}

// Function to load user profile data
function loadUserProfile() {
    const userData = localStorage.getItem("user");

    if (userData) {
        try {
            const user = JSON.parse(userData);

            if (user && user.username && user.email) {
                document.getElementById("username").textContent = `Username: ${user.username}`;
                document.getElementById("email").textContent = `Email: ${user.email}`;
            } else {
                showGuestUser();
            }
        } catch (error) {
            console.error("Error parsing user data:", error);
            localStorage.removeItem("user"); // Clear corrupt data
            showGuestUser();
        }
    } else {
        showGuestUser();
    }
}

// Helper function to show guest user details
function showGuestUser() {
    document.getElementById("username").textContent = "Username: Guest";
    document.getElementById("email").textContent = "Email: N/A";
}

// Logout function
function logout() {
    localStorage.removeItem("token"); // Ensure token is removed
    localStorage.removeItem("user"); // Remove user data

    alert("Logged out successfully!");

    // Redirect to login page
    window.location.replace("login.html");
}
