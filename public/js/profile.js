AOS.init({
    easing: 'ease-in-out',
    duration: 1000,
    once: true,  // trigger animation once per element
  });

function isLoggedIn() {
    return getCookie('accessToken') !== undefined;
}

// Function to handle dynamic page navigation
function navigateTo(url) {
    // Check if the user is authenticated before allowing access to certain pages
    if (url !== "/login" && !isLoggedIn()) {
        // If not logged in, redirect to login page
        window.location.href = '/login';
        return;
    }

    // If logged in or the link is '/login', navigate to the desired route
    window.location.href = url;
}

// Function to get a specific cookie (in this case, 'accessToken')
// Helper function to get cookies (if using cookies for JWT tokens)
function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

// Adding event listeners for links in navbar
document.getElementById("home-link").addEventListener("click", () => navigateTo('/home'));
document.getElementById("about-link").addEventListener("click", () => navigateTo('/about'));
document.getElementById("contact-link").addEventListener("click", () => navigateTo('/contact'));
// document.getElementById("profile-link").addEventListener("click", () => navigateTo('/profile'));
document.getElementById("mysubject-link").addEventListener("click", () => navigateTo('/mysubject'));




function menubar() {
    let hihu = document.querySelector('.menu-data');
    let element = document.getElementById('Menu-bar');
    // let profilepic = document.getElementById("profilePic");


    if (hihu) {
        hihu.classList.remove('animate__fadeOut');
        element.style.display = 'none';
        hihu.style.zIndex = '1';
        hihu.classList.add('animate__fadeIn');
        // profilepic.remove();
        

    }
}

function closebar() {
    let hihu = document.querySelector('.menu-data');
    let element = document.getElementById('Menu-bar');
    if (hihu) {
        hihu.classList.remove('animate__fadeIn');
        hihu.style.zIndex = '-20';
        element.style.display = 'block';
        hihu.classList.add('animate__fadeOut');
    }
}




// Selecting Elements
const profilePicture = document.getElementById('profilePicture');
const modal = document.getElementById('modal');
const viewProfilePic = document.getElementById('viewProfilePic');
const changeProfilePic = document.getElementById('changeProfilePic');
const closeModal = document.getElementById('closeModal');
const changeProfilePicture = document.getElementById('changeProfilePicture');
const saveChanges = document.getElementById('saveChanges');
const nameField = document.getElementById('nameField');
const emailField = document.getElementById('emailField');
const displayName = document.getElementById('displayName');
const prevPassword = document.getElementById('prevPassword');
const newPassword = document.getElementById('newPassword');
const confirmPassword = document.getElementById('confirmPassword');
const viewImagePopup = document.getElementById('viewImagePopup');
const popupImage = document.getElementById('popupImage');
const closeImagePopup = document.getElementById('closeImagePopup');
const removeImagePopup = document.getElementById('removeImagePopup');

// Functionality to handle Profile Picture Modal
profilePicture.addEventListener('click', () => {
    modal.classList.add('show');
});

viewProfilePic.addEventListener('click', () => {
    popupImage.src = profilePicture.src;
    viewImagePopup.classList.add('show');
    modal.classList.remove('show');
});

changeProfilePic.addEventListener('click', () => {
    changeProfilePicture.click();
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('show');
});

closeImagePopup.addEventListener('click', () => {
    viewImagePopup.classList.remove('show');
});

removeImagePopup.addEventListener('click', () => {
    profilePicture.src = "https://via.placeholder.com/120";
    viewImagePopup.classList.remove('show');
});

// Change Profile Picture when selected
changeProfilePicture.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            profilePicture.src = event.target.result;
        };
        reader.readAsDataURL(file);
        modal.classList.remove('show');
    }
});

// Save Changes functionality
saveChanges.addEventListener('click', () => {
    const name = nameField.value;
    const email = emailField.value;
    const oldPass = prevPassword.value;
    const newPass = newPassword.value;
    const confirmPass = confirmPassword.value;

    if (newPass && newPass !== confirmPass) {
        alert('Passwords do not match');
        return;
    }

    // Apply changes (update display)
    displayName.textContent = name;
    // alert('Profile updated successfully');
});




document.getElementById("btn-logout").addEventListener('click', () => {
    fetch("/api/v1/user/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include' // Important for sending cookies
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(responseData => {
        if (responseData.success) {
           
            window.location.href = '/login';
            setTimeout(() => {
                window.location.reload(true);
            }, 500);
        } else {
            alert("Logout failed: " + responseData.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred: ' + error.message);
    });
});