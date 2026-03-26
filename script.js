// LOAD SAVED NOTES
window.onload = () => {
  document.getElementById("notes").value = localStorage.getItem("notes") || "";
};

// ADD COURSE
function addCourse() {
  const div = document.createElement("div");

  div.innerHTML = `
    <input type="number" placeholder="Course Unit" class="unit">
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
    const unit = parseFloat(units[i].value);
    const grade = parseFloat(grades[i].value);

    if (!isNaN(unit) && unit > 0) {
      totalUnits += unit;
      totalPoints += unit * grade;
    }
  }

  if (totalUnits === 0) {
    document.getElementById("result").innerText = "Enter valid data";
    return;
  }

  const cgpa = totalPoints / totalUnits;
  document.getElementById("result").innerText = `Your CGPA: ${cgpa.toFixed(2)}`;
}

// SAVE NOTES
function saveNotes() {
  const notes = document.getElementById("notes").value;
  localStorage.setItem("notes", notes);
  alert("Notes saved!");
}

// COUNTDOWN
let countdownInterval;

function setCountdown() {
  const examDateInput = document.getElementById("examDate").value;
  
  if (!examDateInput) {
    document.getElementById("countdown").innerText = "Please select a date";
    return;
  }

  const examDate = new Date(examDateInput);
  
  if (isNaN(examDate.getTime())) {
    document.getElementById("countdown").innerText = "Invalid date";
    return;
  }

  // Clear any existing countdown interval
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }

  function updateCountdown() {
    const now = new Date();
    const diff = examDate - now;

    if (diff <= 0) {
      document.getElementById("countdown").innerText = "Exam Day!";
      clearInterval(countdownInterval);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    document.getElementById("countdown").innerText = `${days} days remaining`;
  }

  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
}