// Complete implementations for all functions in script.js

function saveNotes(notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function changeFont(fontFamily) {
    document.body.style.fontFamily = fontFamily;
}

function addCourse(courseName, courses) {
    courses.push(courseName);
    return courses;
}

function calculateCGPA(grades) {
    let totalPoints = 0;
    let totalCredits = 0;
    for (let grade of grades) {
        totalPoints += grade.points * grade.credits;
        totalCredits += grade.credits;
    }
    return totalPoints / totalCredits;
}

function setCountdown(endTime) {
    const now = new Date().getTime();
    const distance = endTime - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
