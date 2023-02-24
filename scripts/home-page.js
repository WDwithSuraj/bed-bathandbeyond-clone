// let user = document.querySelector("#user-account > h3")
// let showLogin = document.getElementById("login-form")
// user.onclick = function(){
//     showLogin.style.display = "block"
// }
//code for firebase......
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
function getUserData(userId) {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${userId}`)).then((snapshot) => {
        if (snapshot.exists()) {
            let userDetails = snapshot.val()
            console.log(userDetails)
            localStorage.setItem('userDetails', JSON.stringify(userDetails));
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}




let userSignInBtn = document.getElementById('login-form')
let changeLoginText = document.getElementById('signInHeader')
let userDataText = document.querySelector('#user-account > form')




//localStorage
let userDetails = JSON.parse(localStorage.getItem('userDetails'))
let UserLogin = localStorage.getItem('login')



console.log(UserLogin)
userSignInBtn.addEventListener('submit', (e) => {
    e.preventDefault()
    let email = document.getElementById('s-signIn-email').value;
    let password = document.getElementById('s-signIn-password').value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            if (user.accessToken) {
                getUserData(user.uid)
                setTimeout(() => {
                    window.location.reload()
                }, 1500)
            }
            // onAuthStateChanged(auth, (user) => {
            //     if (user) {
            //         // User is signed in, see docs for a list of available properties
            //         // https://firebase.google.com/docs/reference/js/firebase.User
            //         const uid = user.uid;
            //         // alert('User has been signed in')


            //         // ...
            //     } else {
            //         // User is signed out
            //         // ...
            //         console.log('User is signed OUt')
            //     }
            // });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorMessage) {
                alert("Please Enter Correct Credentials")
            }
        });

})


if (userDetails) {
    changeLoginText.innerText = "My Account"
    userDataText.innerHTML = null;
    let userName = document.createElement('h3')
    userName.classList.add('userHeading')
    userName.innerText = `Hii ${userDetails.firstName}`
    let userPra = document.createElement('p')
    userPra.innerText = `Welcome ${userDetails.firstName}  to Bath Kit.
    Here we insure Customer happiness by providing 100% quality products.`

    let userLogOutBtn = document.createElement('button')
    userLogOutBtn.setAttribute('id', 'userLogBtn')
    userLogOutBtn.innerText = "Log Out"
    userLogOutBtn.addEventListener('click', () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't to Log Out",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Log Out!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Log Out!',
                    'You have been logged out!.',
                    'success'
                )
                localStorage.removeItem('userDetails')
                setTimeout(() => {
                    location.href = 'index.html'
                    localStorage.removeItem('userDetails');

                }, 1000)
            }
        })

    })

    userDataText.append(userName, userPra, userLogOutBtn)
}
// else if (userDetails == undefined) {
//    location.href = ''
// }

