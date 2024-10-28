import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyBqSroOB26GDUQaUROejWxIPl4Z48a7WXw",
    authDomain: "blogger-24.firebaseapp.com",
    projectId: "blogger-24",
    storageBucket: "blogger-24.appspot.com",
    messagingSenderId: "433642582525",
    appId: "1:433642582525:web:67f5d61e6e68fd6fb22994",
};

const app = initializeApp(firebaseConfig);

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const provider = new GoogleAuthProvider();

function signInUser(){
    const auth = getAuth(app);
    signInWithPopup(auth, provider)
    .then((result)=> {
        // const cred = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        const name = user.displayName;
        const email = user.email;
        const uid = user.uid;
        console.log("User Signed In", name, email, uid);
        
    
    })
    .catch((error)=>{
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Unable to Sign In with Google", errorCode, errorMessage);
    })
}

export default signInUser