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











// document.getElementById("signup-btn").addEventListener("click",()=>{
//     document.getElementById("signupFrm").classList.toggle("signupFrmPopup");

//     const signuppopup= document.querySelector('.loginFrmPopup');
//     if(signuppopup){
//         document.getElementById("loginFrm").classList.remove("loginFrmPopup");
//     }


// });
// const checkBox = document.getElementById("checkbox");
// document.getElementById("signupsubmitBtn").addEventListener("click", () => {

//     if (checkBox.checked) {
//         document.getElementById("signupFrm").classList.remove("signupFrmPopup");
//         document.querySelector(".checkTermAndCondition").classList.remove("checkTermAndConditionPopup");
//     } else {
//         document.querySelector(".checkTermAndCondition").classList.add("checkTermAndConditionPopup");
        
//     }
// });


// document.getElementById("login-btn").addEventListener("click",()=>{

//     document.getElementById("loginFrm").classList.toggle("loginFrmPopup");
//     const loginpopup= document.querySelector('.signupFrmPopup');
//     if(loginpopup){
//         document.getElementById("signupFrm").classList.remove("signupFrmPopup");
//     }
 
   
// });

// document.getElementById("loginsubmitBtn").addEventListener("click",()=>{
//     document.getElementById("loginFrm").classList.remove("loginFrmPopup");

// });
// const getStartedButton = document.getElementById("GetStarted");

        
//  getStartedButton.addEventListener("click", function() {
        
//             getStartedButton.innerText = 'Get Started ->';
//             console.log("Button clicked!");
// });



