// ================= NOTES =================
function saveNotes() {
  try {
    const textarea = document.getElementById("notes");
    if (!textarea) return;

    const note = textarea.value;
    localStorage.setItem("campus_notes", note);

    alert("Notes saved!");
  } catch (err) {
    console.error("Error saving notes:", err);
  }
}

// LOAD NOTES ON START
window.addEventListener("load", () => {
  try {
    const textarea = document.getElementById("notes");
    if (!textarea) return;

    const saved = localStorage.getItem("campus_notes");
    if (saved) textarea.value = saved;
  } catch (err) {
    console.error("Error loading notes:", err);
  }
});

// ================= FONT =================
function changeFont(fontFamily) {
  const textarea = document.getElementById("notes");
  if (!textarea) return;

  textarea.style.fontFamily = fontFamily || "Arial";
}

// ================= COURSES =================
function addCourse() {
  const container = document.getElementById("course-list");
  if (!container) return;

  const div = document.createElement("div");

  div.innerHTML = `
    <input type="number" class="unit" placeholder="Units">
    <input type="number" class="grade" placeholder="Grade (0-5)">
  `;

  container.appendChild(div);
}

// ================= CGPA =================
function calculateCGPA() {
  const units = document.querySelectorAll(".unit");
  const grades = document.querySelectorAll(".grade");
  const result = document.getElementById("result");

  if (!units.length || !grades.length) {
    if (result) result.innerText = "No courses added.";
    return;
  }

  let totalUnits = 0;
  let totalPoints = 0;

  for (let i = 0; i < units.length; i++) {
    const unit = parseFloat(units[i].value);
    const grade = parseFloat(grades[i].value);

    if (isNaN(unit) || isNaN(grade)) continue;

    totalUnits += unit;
    totalPoints += unit * grade;
  }

  if (totalUnits === 0) {
    result.innerText = "Invalid input.";
    return;
  }

  const cgpa = (totalPoints / totalUnits).toFixed(2);
  result.innerText = `CGPA: ${cgpa}`;
}

// ================= COUNTDOWN =================
function setCountdown() {
  const input = document.getElementById("examDate");
  const display = document.getElementById("countdown");

  if (!input || !display) return;

  const endTime = new Date(input.value).getTime();

  if (!input.value || isNaN(endTime)) {
    display.innerText = "Please select a valid date.";
    return;
  }

  const interval = setInterval(() => {
    const now = new Date().getTime();
    const distance = endTime - now;

    if (distance <= 0) {
      clearInterval(interval);
      display.innerText = "Time's up!";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((distance / (1000 * 60)) % 60);
    const secs = Math.floor((distance / 1000) % 60);

    display.innerText =
      `${days}d ${hours}h ${mins}m ${secs}s`;
  }, 1000);
}
