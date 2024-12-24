
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
