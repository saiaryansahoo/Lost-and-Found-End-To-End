document.addEventListener("DOMContentLoaded", function () {
    checkAuth(); // Ensure the user is logged in before accessing profile
    loadUserProfile();
});

// Function to check authentication and redirect if not logged in
function checkAuth() {
    if (!localStorage.getItem("token")) {
        window.location.replace("login.html"); // Redirect to login page
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
                setDefaultProfile();
            }
        } catch (error) {
            console.error("Error parsing user data:", error);
            localStorage.removeItem("user"); // Remove corrupted data
            setDefaultProfile();
        }
    } else {
        setDefaultProfile();
    }
}

// Function to set default profile values when no user data is available
function setDefaultProfile() {
    document.getElementById("username").textContent = "Username: Guest";
    document.getElementById("email").textContent = "Email: N/A";
}

// Logout function
function logout() {
    localStorage.removeItem("token"); // Remove token
    localStorage.removeItem("user");  // Remove user data

    alert("Logged out successfully!");

    // Redirect to login page and prevent going back to profile/dashboard
    window.location.replace("login.html"); 
}
