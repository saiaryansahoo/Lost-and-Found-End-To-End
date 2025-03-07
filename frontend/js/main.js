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

// Particle.js Configuration
particlesJS("particles-js", {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
        move: { enable: true, speed: 3, direction: "none", random: true, straight: false, out_mode: "out" }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "bubble" },
            onclick: { enable: true, mode: "push" },
            resize: true
        },
        modes: {
            bubble: { distance: 200, size: 6, duration: 2, opacity: 0.8, speed: 3 },
            push: { particles_nb: 4 }
        }
    },
    retina_detect: true
});

// Fetch Data Function
async function fetchLostAndFoundData() {
    try {
        const lostResponse = await fetch("http://localhost:8080/api/lost");
        const lostItems = await lostResponse.json();

        const foundResponse = await fetch("http://localhost:8080/api/found");
        const foundItems = await foundResponse.json();

        const lostTableBody = document.getElementById("lost-items-table");
        lostTableBody.innerHTML = "";
        lostItems.forEach(item => {
            let row = `<tr>
                <td>${item.name}</td>
                <td>${item.location}</td>
                <td>${item.contactNumber}</td>
            </tr>`;
            lostTableBody.innerHTML += row;
        });

        const foundTableBody = document.getElementById("found-items-table");
        foundTableBody.innerHTML = "";
        foundItems.forEach(item => {
            let row = `<tr>
                <td>${item.name}</td>
                <td>${item.location}</td>
                <td>${item.contactNumber}</td>
            </tr>`;
            foundTableBody.innerHTML += row;
        });

        document.querySelector(".card.lost .count").textContent = lostItems.length;
        document.querySelector(".card.found .count").textContent = foundItems.length;

        const resolvedCount = foundItems.filter(item => item.resolved === true).length;
        document.querySelector(".card.resolved .count").textContent = resolvedCount;

    } catch (error) {
        console.error("Error fetching lost & found items:", error);
    }
}

fetchLostAndFoundData();
