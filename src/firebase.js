// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
//   apiKey: "AIzaSyDEfyo_golztZh9g7xTbOSnBQ-W9ffkEzU",
//   authDomain: "siriauth-67166.firebaseapp.com",
//   projectId: "siriauth-67166",
//   storageBucket: "siriauth-67166.appspot.com",
//   messagingSenderId: "903445465121",
//   appId: "1:903445465121:web:9925d8043d6cf8e34afb60",
//   measurementId: "G-G7K2Z0RPKK"

    // apiKey: "AIzaSyBduSxLazfbqztkuxVPFjj_waDOQPC0FCA",
    // authDomain: "gnanapriyaportfolio.firebaseapp.com",
    // projectId: "gnanapriyaportfolio",
    // storageBucket: "gnanapriyaportfolio.appspot.com",
    // messagingSenderId: "417664367279",
    // appId: "1:417664367279:web:b5776827eec3b394f0725a",
    // measurementId: "G-7BC2194C7X"

    apiKey: "AIzaSyCVv3jPC-ZZjLoaoNf4Zhn4vBab5iCX2SI",
    authDomain: "thegoodlife-a2647.firebaseapp.com",
    projectId: "thegoodlife-a2647",
    storageBucket: "thegoodlife-a2647.appspot.com",
    messagingSenderId: "733996774374",
    appId: "1:733996774374:web:1927fd1953cebddd8f1c27",
    measurementId: "G-HP3PJZXQMV",
    databaseURL : 'https://thegoodlife-a2647-default-rtdb.firebaseio.com'
    
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const database = getDatabase(app);
export const storage = getStorage(app);

export default app;
