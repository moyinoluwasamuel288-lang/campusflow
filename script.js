// SERVICE WORKER
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
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

    if (!isNaN(u)) {
      totalUnits += u;
      totalPoints += u * g;
    }
  }

  let cgpa = totalPoints / totalUnits;

  document.getElementById("result").innerText =
    isNaN(cgpa) ? "Enter valid values" : "CGPA: " + cgpa.toFixed(2);
}

// TIMER
function startCountdown() {
  const date = new Date(document.getElementById("examDate").value);

  Notification.requestPermission();

  setInterval(() => {
    const now = new Date();
    const diff = date - now;

    if (diff <= 0) {
      document.getElementById("countdown").innerText = "Time Up!";
      new Notification("Exam Time!", {
        body: "Your exam has started"
      });
      return;
    }

    let h = Math.floor(diff / (1000 * 60 * 60));
    let m = Math.floor((diff / (1000 * 60)) % 60);

    document.getElementById("countdown").innerText =
      `${h}h ${m}m remaining`;
  }, 1000);
}
