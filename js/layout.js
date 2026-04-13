function loadComponent(id, file) {
    fetch(file)
        .then(res => res.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        });
}

document.addEventListener("DOMContentLoaded", () => {
    loadComponent("nav", "/components/nav.html");
    loadComponent("footer", "/components/footer.html");
});

function toggleExam() {
    const content = document.getElementById("exam-content");
    const arrow = document.getElementById("arrow");

    if (content.style.display === "block") {
        content.style.display = "none";
        arrow.innerText = "▼";
    } else {
        content.style.display = "block";
        arrow.innerText = "▲";
    }
}

function toggleMain() {
    const section = document.getElementById("vehicle-section");
    const arrow = document.getElementById("main-arrow");

    if (section.style.display === "block") {
        section.style.display = "none";
        arrow.innerText = "▼";
    } else {
        section.style.display = "block";
        arrow.innerText = "▲";
    }
}

// Only one vehicle open at a time
function toggleVehicle(id) {
    const all = document.querySelectorAll(".vehicle-content");

    all.forEach(el => {
        if (el.id !== id) {
            el.style.maxHeight = null;
            el.classList.remove("open");
        }
    });

    const selected = document.getElementById(id);

    if (!selected.innerHTML) {
        selected.innerHTML = renderVehicleContent(id);
    }

    if (selected.style.maxHeight) {
        selected.style.maxHeight = null;
        selected.classList.remove("open");
    } else {
        selected.style.maxHeight = selected.scrollHeight + "px";
        selected.classList.add("open");
    }
}

// Start exam
function startExam(type) {
    // Store selected type
    localStorage.setItem("vehicleType", type);

    // Navigate
    window.location.href = "exam.html";
}

const examInfoHTML = `
    <p>
        The Official Learner's License exam consists of the following questions and required pass mark with a 60 min time limit:
    </p>

    <ul>
        <li><strong>Road Rules:</strong> 22/30</li>
        <li><strong>Road Signs:</strong> 23/30</li>
        <li><strong>Vehicle Controls:</strong> 6/8</li>
    </ul>

    <p class="note">
        Please ensure that you are studying for the correct exam with the DLTC where you'll be doing your official exam.
    </p>

    <p>Select an option below to start a new exam.</p>
`;

function renderVehicleContent(type) {
    return `
        <div class="exam-info">
            ${examInfoHTML}
            <button class="btn continue-btn" onclick="startExam('${type}')">
                Continue
            </button>
        </div>
    `;
}