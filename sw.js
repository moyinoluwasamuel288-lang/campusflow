<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CampusFlow</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="container">

  <h1>CampusFlow</h1>

  <!-- NOTES -->
  <section class="card">
    <h2>Notes</h2>
    <textarea id="notes" placeholder="Write your notes..."></textarea>
    
    <div class="controls">
      <select onchange="changeFont(this.value)">
        <option value="Arial">Arial</option>
        <option value="Georgia">Georgia</option>
        <option value="Courier New">Courier</option>
      </select>

      <button onclick="saveNotes()">Save</button>
    </div>
  </section>

  <!-- CGPA -->
  <section class="card">
    <h2>CGPA Calculator</h2>

    <div id="course-list"></div>

    <button onclick="addCourse()">+ Add Course</button>
    <button onclick="calculateCGPA()">Calculate</button>

    <h3 id="result"></h3>
  </section>

  <!-- COUNTDOWN -->
  <section class="card">
    <h2>Exam Countdown</h2>

    <input type="datetime-local" id="examDate">
    <button onclick="setCountdown()">Start</button>

    <h3 id="countdown"></h3>
  </section>

  <!-- AI -->
  <section class="card ai-card">
    <h2>AI Assistant</h2>

    <div id="aiChat" class="chat-box"></div>

    <div class="ai-input">
      <input id="aiInput" placeholder="Ask something..." />
      <button onclick="askAI()">Send</button>
    </div>
  </section>

</div>

<script src="script.js"></script>
</body>
</html>
