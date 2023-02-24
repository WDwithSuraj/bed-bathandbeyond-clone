import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithRedirect, getRedirectResult, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";




const firebaseConfig = {
    apiKey: "AIzaSyCXkSspJOKnsho05q65mZf2KNxkLOzKSzI",
    authDomain: "bath-kit--project.firebaseapp.com",
    projectId: "bath-kit--project",
    storageBucket: "bath-kit--project.appspot.com",
    messagingSenderId: "877164615818",
    appId: "1:877164615818:web:99b89445c95bc757cb3573",
    measurementId: "G-902YJDRM0K",
    databaseURL: "https://bath-kit--project-default-rtdb.firebaseio.com/"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(app);

let userEmail = document.getElementById('s-email');
let singUpPageContinueBtn = document.getElementById('continue-btn');
let continueWithGoogleBtn = document.querySelector('.s-continueWithGoogle')
let continueWithAppleBtn = document.querySelector('.s-continueWithApple')
let backButton = document.querySelector('.s-backButton');




function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail.value)) {
        return (true)
    }
    alert("You have entered an invalid email address!")
    return (false)
}

singUpPageContinueBtn.addEventListener('click', () => {
    if (ValidateEmail(userEmail)) {

        localStorage.setItem('user-email', userEmail.value)
        setTimeout(() => {
            location.href = 'signup-detail.html'
        }, 1000)
    }

})
backButton.addEventListener('click', () => {
    location.href = "index.html"
})
continueWithGoogleBtn.addEventListener('click', () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
            console.log(user)
            if (user.accessToken) {
                let userObj = {
                    firstName: user.displayName,
                    email: user.email
                }
                localStorage.setItem('userDetails', JSON.stringify(userObj))
                Swal.fire(
                    'congratulation',
                    'Your account has been created',
                    'success',
                )
                setTimeout(() => {
                    location.href = "index.html"
                }, 3000)
            }


        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
})
