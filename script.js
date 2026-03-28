// REGISTER SERVICE WORKER
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}

// INSTALL BUTTON
let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  document.getElementById("installBtn").style.display = "block";
});

document.getElementById("installBtn").addEventListener("click", () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
  }
});

// NOTES
window.onload = () => {
  document.getElementById("notes").value =
    localStorage.getItem("notes") || "";
};

function saveNotes() {
  const notes = document.getElementById("notes").value;
  localStorage.setItem("notes", notes);
  alert("Saved!");
}

// CGPA
function addCourse() {
  const div = document.createElement("div");

  div.innerHTML = `
    <input type="number" placeholder="Units" class="unit">
    <select class="grade">
      <option value="5">A</option>
      <option value="4">B</option>
      <option value="3">C</option>
      <option value="2">D</option>
      <option value="1">E</option>
      <option value="0">F</option>
    </select>
  `;

  document.getElementById("course-list").appendChild(div);
}

function calculateCGPA() {
  const units = document.querySelectorAll(".unit");
  const grades = document.querySelectorAll(".grade");

  let totalUnits = 0;
  let totalPoints = 0;

  for (let i = 0; i < units.length; i++) {
    let u = parseFloat(units[i].value);
    let g = parseFloat(grades[i].value);

    if (!isNaN(u) && !isNaN(g)) {
      totalUnits += u;
      totalPoints += u * g;
    }
  }

  let cgpa = totalPoints / totalUnits;

  document.getElementById("result").innerText =
    isNaN(cgpa) ? "Invalid Input" : "CGPA: " + cgpa.toFixed(2);
}

// TIMER + NOTIFICATIONS
function startCountdown() {
  const date = new Date(document.getElementById("examDate").value);

  Notification.requestPermission();

  setInterval(() => {
    const now = new Date();
    const diff = date - now;

    if (diff <= 0) {
      document.getElementById("countdown").innerText = "Time up!";

      new Notification("CampusFlow", {
        body: "Your exam time has arrived!"
      });

      return;
    }

    let h = Math.floor(diff / (1000 * 60 * 60));
    let m = Math.floor((diff / (1000 * 60)) % 60);

    document.getElementById("countdown").innerText =
      `${h}h ${m}m left`;
  }, 1000);
}

// SMART AI
function askAI() {
  const input = document.getElementById("aiInput").value.toLowerCase();
  const chat = document.getElementById("chat");

  chat.innerHTML += `<p><b>You:</b> ${input}</p>`;

  let reply = generateResponse(input);

  chat.innerHTML += `<p><b>AI:</b> ${reply}</p>`;

  document.getElementById("aiInput").value = "";
}

function generateResponse(input) {
  if (input.includes("cgpa")) return "Use the CGPA section above.";
  if (input.includes("study")) return "Try 25-minute focus sessions.";
  if (input.includes("exam")) return "Set your countdown timer.";
  return "Ask something more specific.";
}
