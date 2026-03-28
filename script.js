// PWA REGISTER
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}

// LOAD NOTES
window.onload = () => {
  document.getElementById("notes").value =
    localStorage.getItem("notes") || "";
};

// SAVE NOTES
function saveNotes() {
  const val = document.getElementById("notes").value;
  localStorage.setItem("notes", val);
  alert("Saved!");
}

// FONT
function changeFont(font) {
  document.getElementById("notes").style.fontFamily = font;
}

// ADD COURSE
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

// CGPA
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
    isNaN(cgpa) ? "Invalid" : "CGPA: " + cgpa.toFixed(2);
}

// TIMER + NOTIFICATION
function startCountdown() {
  const date = new Date(document.getElementById("examDate").value);

  Notification.requestPermission();

  setInterval(() => {
    const now = new Date();
    const diff = date - now;

    if (diff <= 0) {
      document.getElementById("countdown").innerText = "Time up!";

      new Notification("Exam Time!", {
        body: "Your exam has started!"
      });

      return;
    }

    let h = Math.floor(diff / (1000 * 60 * 60));
    let m = Math.floor((diff / (1000 * 60)) % 60);

    document.getElementById("countdown").innerText =
      `${h}h ${m}m left`;
  }, 1000);
}

// AI (SMART LOCAL + ONLINE FALLBACK)
function askAI() {
  const input = document.getElementById("aiInput").value;
  const chat = document.getElementById("chat");

  chat.innerHTML += `<p><b>You:</b> ${input}</p>`;

  let reply = "";

  // LOCAL INTELLIGENCE (NEVER FAILS)
  if (input.includes("cgpa")) {
    reply = "Use the CGPA calculator above.";
  } else if (input.includes("exam")) {
    reply = "Set your exam date in the countdown section.";
  } else {
    reply = "I'm still improving 😅 but I got you.";
  }

  chat.innerHTML += `<p><b>AI:</b> ${reply}</p>`;

  document.getElementById("aiInput").value = "";
}
