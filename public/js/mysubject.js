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
document.getElementById("profile-link").addEventListener("click", () => navigateTo('/profile'));
document.getElementById("subject-matarial-link").addEventListener("click", () => navigateTo('/subjectmatarial'));


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
   let ItratorForSubjectImage=0;
SubjectImage=['/src/mysubjectImage/image1.webp','/src/mysubjectImage/image2.webp','/src/mysubjectImage/image3.webp','/src/mysubjectImage/image4.webp']

  

  document.getElementById("AddSubjectForm").addEventListener('submit',function(e){
    e.preventDefault();
    
    let SubjectName=document.getElementById("subjectname").value;
    let TeacherName=document.getElementById("teachername").value;

if(SubjectName.length<=0 || TeacherName.length<=0){
  document.getElementById("errorDisplaydiv").classList.remove("errorDisplay");

}
    else{
      let newSubject = document.createElement('div')
      newSubject.classList.add('item');
      
      newSubject.textContent=`${SubjectName} by ${TeacherName}`;
      console.log(ItratorForSubjectImage);
      newSubject.style.backgroundImage=`url(${SubjectImage[ItratorForSubjectImage]})`;
      ItratorForSubjectImage++;
      if (ItratorForSubjectImage >= SubjectImage.length) {
        ItratorForSubjectImage = 0;
      }
      document.getElementById("SubjectGridBox").appendChild(newSubject);
    
        document.getElementById("errorDisplaydiv").classList.add("errorDisplay")

        document.getElementById("subjectname").value = "";
        document.getElementById("teachername").value = "";

        SubjectNameForDownloadBox = document.createElement('div');
        SubjectNameForDownloadBox.classList.add("DownloadPopupContainerItem")
        SubjectNameForDownload = document.createElement('div');
        SubjectNameForDownload.classList.add("SubjectNameForDownload")
        SubjectNameForDownload.textContent  =`${SubjectName}`
        SubjectButtonForDownload = document.createElement('button');
        SubjectButtonForDownload.classList.add("SubjectButtonForDownload")
        SubjectButtonForDownload.textContent='Download';
        SubjectButtonForEdit = document.createElement('button');
        SubjectButtonForEdit.classList.add("SubjectButtonForEdit")
        SubjectButtonForEdit.textContent='Edit';
        

        downloadSubjectPdfContainer.appendChild(SubjectNameForDownloadBox);
        SubjectNameForDownloadBox.appendChild(SubjectNameForDownload)
        SubjectNameForDownloadBox.appendChild(SubjectButtonForDownload)
        SubjectNameForDownloadBox.appendChild(SubjectButtonForEdit)



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
      }
    

  })
const openDownloadPopup = document.getElementById("Download")
const popupDownloadContainer = document.getElementById("downloadpopupContainer");
const closePopupBtn = document.getElementById("closeDownloadPopup");

openDownloadPopup.addEventListener("click", () => {
  popupDownloadContainer.style.display = "flex";
});


closePopupBtn.addEventListener("click", () => {
  popupDownloadContainer.style.display = "none";
});

// Close the popup if the user clicks outside of the popup content
window.addEventListener("click", (e) => {
  if (e.target === popupDownloadContainer) {
    popupDownloadContainer.style.display = "none";
  }
});








// redirection ot the various subject according to their name;

