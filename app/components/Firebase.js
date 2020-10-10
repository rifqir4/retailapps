import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyCNMPNNTlVJQTL0mNzQUmzxN8Pc20mFDmU",
    authDomain: "retailapps-f341e.firebaseapp.com",
    databaseURL: "https://retailapps-f341e.firebaseio.com",
    projectId: "retailapps-f341e",
    storageBucket: "retailapps-f341e.appspot.com",
    messagingSenderId: "584237018934",
    appId: "1:584237018934:web:6c6ddd9400b6ef79124d97"
  };
  // Initialize Firebase
  const Firebase = firebase.initializeApp(firebaseConfig);

  export default Firebase;