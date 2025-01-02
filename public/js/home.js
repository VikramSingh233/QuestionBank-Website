AOS.init({
    easing: 'ease-in-out',
    duration: 1000,
    once: true,  // trigger animation once per element
  });

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
// document.getElementById("home-link").addEventListener("click", () => navigateTo('/home'));
document.getElementById("about-link").addEventListener("click", () => navigateTo('/about'));
document.getElementById("contact-link").addEventListener("click", () => navigateTo('/contact'));
document.getElementById("profile-link").addEventListener("click", () => navigateTo('/profile'));
document.getElementById("mysubject-link").addEventListener("click", () => navigateTo('/mysubject'));



let getUserSubjectDetails = async () => {
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
    let TotalNumberOfSubjects = data.TotalSubjects;
    let TotalNumberOfQuestions = data.TotalNumberOfQuestions;
    let TopTwoSubject = data.Top2Subject;



    document.getElementById("TopOneSubject").innerHTML=TopTwoSubject[0].subjectName
    document.getElementById("TopOneSubjectTotalQuestion").innerHTML=TopTwoSubject[0].numberOfQuestions
    document.getElementById("TopTwoSubject").innerHTML=TopTwoSubject[1].subjectName
    document.getElementById("TopTwoSubjectTotalQuestion").innerHTML=TopTwoSubject[1].numberOfQuestions
    document.getElementById("TotalNumberOfSubjects").innerHTML=TotalNumberOfSubjects
    document.getElementById("TotalNumberOfQuestions").innerHTML=TotalNumberOfQuestions
    return data;
  };
  
  getUserSubjectDetails();
