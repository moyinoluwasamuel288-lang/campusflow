// ================= NOTES =================
const textarea = document.getElementById("notes");
const fontSelect = document.getElementById("fontSelect");

window.onload = () => {
  textarea.value = localStorage.getItem("notes") || "";
  const font = localStorage.getItem("font");
  if (font) {
    textarea.style.fontFamily = font;
    fontSelect.value = font;
  }
};

textarea.addEventListener("input", () => {
  localStorage.setItem("notes", textarea.value);
  showToast("Saved");
});

fontSelect.addEventListener("change", (e) => {
  textarea.style.fontFamily = e.target.value;
  localStorage.setItem("font", e.target.value);
});

// ================= CGPA =================
function addCourse() {
  const div = document.createElement("div");

  div.innerHTML = `
    <input type="number" class="unit" placeholder="Units">
    <input type="number" class="grade" placeholder="Grade">
  `;

  document.getElementById("course-list").appendChild(div);
}

function calculateCGPA() {
  const units = document.querySelectorAll(".unit");
  const grades = document.querySelectorAll(".grade");

  let totalU = 0;
  let totalP = 0;

  units.forEach((u, i) => {
    const unit = parseFloat(u.value);
    const grade = parseFloat(grades[i].value);

    if (!isNaN(unit) && !isNaN(grade)) {
      totalU += unit;
      totalP += unit * grade;
    }
  });

  document.getElementById("result").innerText =
    totalU ? "CGPA: " + (totalP / totalU).toFixed(2) : "Invalid input";
}

// ================= COUNTDOWN =================
function setCountdown() {
  const end = new Date(document.getElementById("examDate").value).getTime();
  const display = document.getElementById("countdown");

  const interval = setInterval(() => {
    const diff = end - Date.now();

    if (diff <= 0) {
      clearInterval(interval);
      display.innerText = "Done!";
      return;
    }

    const m = Math.floor(diff / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    display.innerText = `${m}m ${s}s`;
  }, 1000);
}

// ================= AI =================
async function runAI() {
  const input = document.getElementById("aiInput").value;
  const output = document.getElementById("aiOutput");

  output.innerText = "Thinking...";

  try {
    const res = await fetch(
      "https://api.allorigins.win/raw?url=https://api.affiliateplus.xyz/api/chatbot?message=" +
      encodeURIComponent(input)
    );

    const data = await res.json();
    output.innerText = data.message;
  } catch {
    output.innerText = "AI failed.";
  }
}

// ================= TIMER =================
function startTimer(mins) {
  let seconds = mins * 60;

  const interval = setInterval(() => {
    seconds--;

    if (seconds <= 0) {
      clearInterval(interval);

      if (Notification.permission === "granted") {
        new Notification("Session Complete 🔥");
      } else {
        Notification.requestPermission();
      }
    }
  }, 1000);
}

// ================= TOAST =================
function showToast(msg) {
  const t = document.createElement("div");
  t.className = "toast";
  t.innerText = msg;
  document.body.appendChild(t);

  setTimeout(() => t.remove(), 1500);
}

// ================= SERVICE WORKER =================
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}
