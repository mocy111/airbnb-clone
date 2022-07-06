import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage"


const firebaseConfig = {
    apiKey: "AIzaSyCB1gXGjFpc0kUo85ElIMMFLry7UvVEFMY",
    authDomain: "airbnb-clone-77abc.firebaseapp.com",
    projectId: "airbnb-clone-77abc",
    storageBucket: "airbnb-clone-77abc.appspot.com",
    messagingSenderId: "911305323563",
    appId: "1:911305323563:web:9cfc5d05177fde546f666e",
    measurementId: "G-1DYGGR820F"
};
const App=()=>{
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
     const db= firebase.firestore();
     const storage= firebase.storage();

     
    
     
    
     return{
         db,
         storage,
         auth
     }
}

export default App
