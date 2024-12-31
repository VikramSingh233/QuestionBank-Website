function isLoggedIn() {
  return getCookie('accessToken') !== undefined;
}

function navigateTo(url) {
  if (url !== "/login" && !isLoggedIn()) {
    window.location.href = '/login';
    return;
  }
  window.location.href = url;
}

// Function to get a specific cookie (in this case, 'accessToken')
// Helper function to get cookies (if using cookies for JWT tokens)
function getCookie(name) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

document.getElementById("home-link").addEventListener("click", () => navigateTo('/home'));
document.getElementById("about-link").addEventListener("click", () => navigateTo('/about'));
document.getElementById("contact-link").addEventListener("click", () => navigateTo('/contact'));
document.getElementById("profile-link").addEventListener("click", () => navigateTo('/profile'));
// document.getElementById("subject-matarial-link").addEventListener("click", () => navigateTo('/subjectmatarial'));


// get element by classname return a html collection so we can not use classlist , if you want to use you have to do looping

downloadSubjectPdfContainer = document.getElementById("DownloadPopupContainer")
document.addEventListener("DOMContentLoaded", () => {
  const openButton = document.querySelector(".AddSubject");
  const closeButton = document.querySelector(".close-popup-btn");

  if (openButton) {
    openButton.addEventListener("click", openPopup);
  }

  if (closeButton) {
    closeButton.addEventListener("click", closePopup);
  }
});
function openPopup() {
  const popup = document.querySelector(".AddSubjectPopup");
  const overlay = document.querySelector(".popup-overlay");

  if (popup) popup.classList.add("AddSubjectPopupCome");
  if (overlay) overlay.classList.add("active");
}

// To close the popup
function closePopup() {
  const popup = document.querySelector(".AddSubjectPopup");
  const overlay = document.querySelector(".popup-overlay");

  if (popup) popup.classList.remove("AddSubjectPopupCome");
  if (overlay) overlay.classList.remove("active");
}

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
let ItratorForSubjectImage = 0;
SubjectImage = ['/src/mysubjectImage/image1.webp', '/src/mysubjectImage/image2.webp', '/src/mysubjectImage/image3.webp', '/src/mysubjectImage/image4.webp']
// fetching all the subjects name which is under this user
let getSubjectNames = async () => {
  let response = await fetch('/mySubject/GetSubjects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  });
  let data = await response.json();
  let username = data.username;
document.getElementById("UserName").innerHTML = username;
  renderSubjects(data.subjects);
  return data;
};
// Function to render data on frontend

let renderSubjects = (subjects) => {
  subjects.forEach(subject => {
    SubjectNameForDownloadBox = document.createElement('div');
    SubjectNameForDownloadBox.classList.add("DownloadPopupContainerItem")
    SubjectNameForDownload = document.createElement('div');
    SubjectNameForDownload.classList.add("SubjectNameForDownload")
    SubjectNameForDownload.textContent = `${subject.subjectName}`
    SubjectButtonForDownload = document.createElement('button');
    SubjectButtonForDownload.classList.add("SubjectButtonForDownload")
    SubjectButtonForDownload.textContent = 'Download';
    SubjectButtonForView = document.createElement('button');
    SubjectButtonForView.classList.add("SubjectButtonForView")
    SubjectButtonForView.textContent = 'View';
    downloadSubjectPdfContainer.appendChild(SubjectNameForDownloadBox);
    SubjectNameForDownloadBox.appendChild(SubjectNameForDownload)
    SubjectNameForDownloadBox.appendChild(SubjectButtonForDownload)
    SubjectNameForDownloadBox.appendChild(SubjectButtonForView)
  });
};

getSubjectNames();

document.body.addEventListener('click', function(e) {
  if (e.target && e.target.classList.contains('SubjectButtonForView')) {
      // Find the SubjectNameForDownload div which is in the same parent box
      let subjectNameElement = e.target.closest('.DownloadPopupContainerItem').querySelector('.SubjectNameForDownload');
      if (subjectNameElement) {
          let subjectName = subjectNameElement.textContent;
          window.location.href = `/mySubject/${subjectName}`;
      }
  }
});


document.getElementById("AddSubjectForm").addEventListener('submit', function (e) {
  e.preventDefault();
  let SubjectName = document.getElementById("subjectname").value;
  let TeacherName = document.getElementById("teachername").value;
  if (SubjectName.length <= 0 || TeacherName.length <= 0) {
    document.getElementById("errorDisplaydiv").classList.remove("errorDisplay");
  }
  else {
    document.getElementById("errorDisplaydiv").classList.add("errorDisplay")
    fetch('/mySubject/AddSubject', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        subjectName: SubjectName,
        teacherName: TeacherName
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
        }
        else {
        }
      })
    closePopup();
    document.getElementById("subjectname").value = "";
    document.getElementById("teachername").value = "";
  }
})








// redirection ot the various subject according to their name;

