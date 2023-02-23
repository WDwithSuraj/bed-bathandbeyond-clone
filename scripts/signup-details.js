// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getDatabase, ref, set, child, get } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const database = getDatabase(app)

function writeUserData(userId, email, password, firstName, lastName, phone) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
        email: email,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        password: password
    });
}


let userEmailData = localStorage.getItem('user-email')
let userEmail = document.getElementById('s-email');
let userFirstName = document.getElementById('s-firstName');
let userLastName = document.getElementById('s-lastName');
let userPhoneNum = document.getElementById('s-phoneNum');
let userPassword = document.getElementById('s-password');
let createAccountBtn = document.getElementById('creatAccount-btn');
let backBtn = document.querySelector('.s-backButton')

window.addEventListener('load', () => {
    userEmail.value = userEmailData
})

backBtn.addEventListener('click', () => {
    location.href = 'signup-page.html'
})


createAccountBtn.addEventListener('click', () => {
    let email = userEmail.value;
    let password = userPassword.value;
    let firstName = userFirstName.value
    let lastName = userLastName.value
    let phone = userPhoneNum.value
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
            writeUserData(user.uid, email, password, firstName, lastName, phone)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            console.log(error)
        });
    Swal.fire(
        'congratulation',
        'Your account has been created',
        'success',
        setTimeout(() => {
            location.href = "index.html"
        }, 3000)
    )
})