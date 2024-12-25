

const container = document.querySelector(".container"),
  pwShowHide = document.querySelectorAll(".showHidePw"),
  pwFields = document.querySelectorAll(".password"),
  signUp = document.querySelector(".signup-link"),
  login = document.querySelector(".login-link");


// js code to appear signup and login form
signUp.addEventListener("click", (e) => {
  e.preventDefault();
  container.classList.add("active");
});

login.addEventListener("click", (e) => {
  e.preventDefault();
  container.classList.remove("active");
});

document.getElementById("registrationForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent default form submission

  // Get form data manually
  const username = document.querySelector('input[name="username"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const password = document.querySelector('input[name="password"]').value;
  const confirmPassword = document.querySelector('input[name="confirmpassword"]').value;

  // Check if all fields are filled
  if (!username || !email || !password || !confirmPassword) {
    alert("All fields must be filled out!");
    return;
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  // Create a data object to send to the server
  const data = {
    username,
    email,
    password,
    confirmPassword
  };

  // Send form data via POST request
  fetch("/api/v1/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Content type is application/json
    },
    body: JSON.stringify(data) // Stringify the data before sending
  })
  .then(response => {
    
    return response.json();
})
.then(responseData => {
    if (responseData.success) {
        console.log(responseData.message);
        window.location.href = '/home';
    } else {
        alert("Registration failed: " + responseData.message);
    }
})
.catch(error => {
    console.error("Error:", error);
    alert("There was an error with the registration process.");
});

});
