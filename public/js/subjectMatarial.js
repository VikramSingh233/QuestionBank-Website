
const addQuestionBtn = document.getElementById("add-question-btn");
const formSection = document.getElementById("form-section");
const questionType = document.getElementById("question-type");
const mcqFields = document.getElementById("mcq-fields");
const questionForm = document.getElementById("question-form");


addQuestionBtn.addEventListener("click", () => {
  formSection.style.display = formSection.style.display === "block" ? "none" : "block";
});


questionType.addEventListener("change", () => {
  if (questionType.value === "mcq") {
    mcqFields.classList.remove("hidden");
  } else {
    mcqFields.classList.add("hidden");
  }
});



document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("question-form");
  const questionTypeField = document.getElementById("question-type");
  const mcqFields = document.getElementById("mcq-fields");
  const submitButton = document.querySelector(".submit-btn");
  questionTypeField.addEventListener("change", () => {
    if (questionTypeField.value === "mcq") {
      mcqFields.classList.remove("hidden");
    } else {
      mcqFields.classList.add("hidden");
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    submitButton.disabled = true;

    try {
      const type = document.getElementById("question-type").value;
      const question = document.getElementById("question").value.trim();
      const solution = document.getElementById("solution").value.trim();
      const topicName = document.getElementById("topic-name").value.trim();
      const tagName = document.getElementById("tag-name").value.trim();
      const mark = document.getElementById("marks").value.trim();
      const optionA = document.getElementById("option-a").value.trim();
      const optionB = document.getElementById("option-b").value.trim();
      const optionC = document.getElementById("option-c").value.trim();
      const optionD = document.getElementById("option-d").value.trim();
      const correctAnswer = document.getElementById("correct-answer").value.trim();

      if (!type || !question || !topicName || !tagName || !mark) {
        alert("Please fill all required fields.");
        submitButton.disabled = false;
        return;
      }

      if (type === "mcq" && (!optionA || !optionB || !optionC || !optionD || !correctAnswer)) {
        alert("Please fill all MCQ-specific fields.");
        submitButton.disabled = false;
        return;
      }
      const options = [];
      if (type === "mcq") {
        options.push(
          { option: optionA, isCorrect: correctAnswer === "A" },
          { option: optionB, isCorrect: correctAnswer === "B" },
          { option: optionC, isCorrect: correctAnswer === "C" },
          { option: optionD, isCorrect: correctAnswer === "D" }
        );
      }
      const formData = new FormData();
      const questionData = {
        type,
        question,
        solution,
        topicName,
        tagName,
        mark: parseInt(mark),
        subject: window.location.pathname.split("/").pop(), // Subject ID from URL
        options,
      };
      formData.append("data", JSON.stringify(questionData)); // Add stringified question data
      // console.log("Form Data:", questionData);

      const response = await fetch(`/mySubject/AddQuestion/${questionData.subject}`, {
        method: "POST",
        body: formData, // FormData sends multipart/form-data
      });

      const result = await response.json();
      console.log("Response:", result);

      if (response.ok) {
        alert("Question added successfully!");
        form.reset();
        mcqFields.classList.add("hidden"); 
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the question.");
    } finally {
      submitButton.disabled = false;
    }
  });
});

