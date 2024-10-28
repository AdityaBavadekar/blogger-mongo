import { getAuth, signInWithPopup, signInWithCredential, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js'

const firebaseConfig = {
    apiKey: "AIzaSyBqSroOB26GDUQaUROejWxIPl4Z48a7WXw",
    authDomain: "blogger-24.firebaseapp.com",
    projectId: "blogger-24",
    storageBucket: "blogger-24.appspot.com",
    messagingSenderId: "433642582525",
    appId: "1:433642582525:web:67f5d61e6e68fd6fb22994",
};

await initializeApp(firebaseConfig);
const auth = await getAuth();
const provider = new GoogleAuthProvider();

async function onLoggedIn(user) {
    const name = user.displayName;
    const email = user.email;
    const uid = user.uid;
    
    const idToken = await user.getIdToken();

    fetch('/api/auth/google', {
        method:'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            name: name,
            email: email,
            uid: uid,
            token: idToken
        })
    });

    console.log("User Signed In", name, email, uid);

    localStorage.setItem('token', user.getIdToken());
    localStorage.setItem('user', user);
    window.location.href = '/';
}

const storedCred = localStorage.getItem('token');
if (storedCred) {
    signInWithCredential(auth, storedCred)
    .then(result=>{onLoggedIn(result.user)})
    .catch((error)=>{
        console.error("Error during sign-in:", error);
    });
}

function signInUser() {
    signInWithPopup(auth, provider)
        .then((result) => {
            const cred = GoogleAuthProvider.credentialFromResult(result);            
            onLoggedIn(result.user);
        })
        .catch((error) => {
            console.error("Error during sign-in:", error);
            alert("Failed to sign in");
        });
}

document.getElementById('login-btn').addEventListener('click', ()=>{signInUser()})