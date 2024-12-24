// Get DOM Elements
const addQuestionBtn = document.getElementById("add-question-btn");
const formSection = document.getElementById("form-section");
const questionType = document.getElementById("question-type");
const mcqFields = document.getElementById("mcq-fields");
const questionForm = document.getElementById("question-form");

// Toggle Form Visibility
addQuestionBtn.addEventListener("click", () => {
  formSection.style.display = formSection.style.display === "block" ? "none" : "block";
});

// Handle Dropdown Selection
questionType.addEventListener("change", () => {
  if (questionType.value === "mcq") {
    mcqFields.classList.remove("hidden");
  } else {
    mcqFields.classList.add("hidden");
  }
});

// Form Submission
questionForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Question submitted successfully!");
});
