const API_URL = "http://localhost:8080/api/users"; // Backend API base URL

// Signup function
async function signup() {
    const username = document.getElementById("signup-username").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    if (!username || !email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            if (data.token) {
                localStorage.setItem("token", data.token); // Store JWT token
                localStorage.setItem("user", JSON.stringify(data.user)); // Store user data
                
                alert("Signup successful! Redirecting to dashboard...");
                window.location.replace("index.html"); // Redirect to dashboard
            } else {
                alert("Signup successful, but no token received. Try logging in.");
                window.location.replace("login.html");
            }
        } else {
            alert("Signup failed: " + (data.message || "Unknown error"));
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
    }
}

// Login function
async function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    if (!email || !password) {
        alert("Please enter email and password.");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            if (data.token) {
                localStorage.setItem("token", data.token); // Store JWT token
                localStorage.setItem("user", JSON.stringify(data.user)); // Store user data
                
                alert("Login successful! Redirecting to dashboard...");
                window.location.replace("index.html"); // Redirect to dashboard
            } else {
                alert("Login successful, but no token received. Try logging in again.");
            }
        } else {
            alert("Invalid credentials!");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
    }
}

// Logout function
function logout() {
    localStorage.removeItem("token"); // Remove token from storage
    localStorage.removeItem("user"); // Remove user data

    alert("Logged out successfully!");
    window.location.replace("login.html"); // Redirect to login page
}

// Check if user is logged in (Redirect to login if not authenticated)
function checkAuth() {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.replace("login.html"); // Redirect to login if not authenticated
    }
}

// Prevent logged-in users from accessing the login page
function preventAuthPages() {
    if (localStorage.getItem("token")) {
        window.location.replace("index.html"); // Redirect logged-in users to dashboard
    }
}

// Function to display logged-in user info on profile page
function displayUser() {
    const userData = localStorage.getItem("user");

    if (userData) {
        try {
            const user = JSON.parse(userData);
            document.getElementById("username").textContent = `Username: ${user.username}`;
            document.getElementById("email").textContent = `Email: ${user.email}`;
        } catch (error) {
            console.error("Error parsing user data:", error);
            localStorage.removeItem("user"); // Remove corrupted data
        }
    }
}

// Run the correct function on page load
document.addEventListener("DOMContentLoaded", function () {
    const path = window.location.pathname;

    if (path.includes("index.html")) {
        checkAuth(); // Ensure users are logged in
    } else if (path.includes("login.html")) {
        preventAuthPages(); // Prevent logged-in users from accessing login page
    } else if (path.includes("profile.html")) {
        checkAuth(); // Ensure authentication before loading profile
        displayUser(); // Display user info on profile
    }
});
