

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
  e.preventDefault();
  const username = document.querySelector('input[name="username"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const password = document.querySelector('input[name="password"]').value;
  const confirmPassword = document.querySelector('input[name="confirmpassword"]').value;
 console.log(username,email,password,confirmPassword)
  if (!username || !email || !password || !confirmPassword) {
    alert("All fields must be filled out!");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  const data = {
    username,
    email,
    password,
    confirmPassword
  };

  fetch("/api/v1/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    
    return response.json();
})
.then(responseData => {
    if (responseData.success) {
        console.log(responseData.message);
        window.location.href = '/loginPage';
    } else {
        alert("Registration failed: " + responseData.message);
    }
})
.catch(error => {
    console.error("Error:", error);
    alert("There was an error with the registration process.");
});

});



document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.querySelector('input[name="emailLogin"]').value;
  const password = document.querySelector('input[name="passwordLogin"]').value;
  if ( !email|| !password) {
    alert("All fields must be filled out!");
    return;
  }


  // Create a data object to send to the server
  const data = {

    email,
    password,
    
  };
  fetch("/api/v1/user/loginUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", 
    },
    body: JSON.stringify(data) 
  })
  .then(response => {
    
    return response.json();
})
.then(responseData => {
    if (responseData.success) {
        console.log(responseData);
        const redirectTo = responseData.data.redirectTo || "/";
        console.log("Redirecting to:", redirectTo);  // Debug log for redirection path
        window.location.href = redirectTo;
    } else {
        alert("Login failed: " + responseData.message);
    }
})
.catch(error => {
    console.error("Error:", error);
    alert("There was an error with the login process.");
});

});
