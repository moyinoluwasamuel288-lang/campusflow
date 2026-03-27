// LOAD NOTES
window.onload = function () {
  document.getElementById("notes").value =
    localStorage.getItem("notes") || "";
};

// SAVE NOTES
function saveNotes() {
  const notes = document.getElementById("notes").value;
  localStorage.setItem("notes", notes);
  alert("Saved!");
}

// CHANGE FONT
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

// CALCULATE CGPA
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
    isNaN(cgpa) ? "Invalid input" : "CGPA: " + cgpa.toFixed(2);
}

// COUNTDOWN
function setCountdown() {
  const date = new Date(document.getElementById("examDate").value);

  setInterval(() => {
    const now = new Date();
    const diff = date - now;

    if (diff <= 0) {
      document.getElementById("countdown").innerText = "Time up!";
      return;
    }

    let days = Math.floor(diff / (1000 * 60 * 60 * 24));
    let hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    let mins = Math.floor((diff / (1000 * 60)) % 60);

    document.getElementById("countdown").innerText =
      `${days}d ${hours}h ${mins}m`;
  }, 1000);
}

// AI (WITH FAIL-SAFE)
async function askAI() {
  const input = document.getElementById("aiInput").value;
  const chat = document.getElementById("aiChat");

  chat.innerHTML += `<p class="user">You: ${input}</p>`;

  try {
    // TRY ONLINE AI (replace with your API later)
    let response = await fetch("https://api.quotable.io/random");
    let data = await response.json();

    chat.innerHTML += `<p class="bot">AI: ${data.content}</p>`;
  } catch (err) {
    // FALLBACK (THIS PREVENTS FAILURE)
    chat.innerHTML += `<p class="bot">AI: I'm offline but still here 😎</p>`;
  }

  document.getElementById("aiInput").value = "";
}
