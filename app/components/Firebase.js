import firebase from "firebase";


var firebaseConfig = {
  apiKey: "AIzaSyAJPBM8K06q40k_0y3ljVEzkxcwK_9UvQ0",
  authDomain: "reactnativedatabase-39438.firebaseapp.com",
  databaseURL: "https://reactnativedatabase-39438.firebaseio.com",
  projectId: "reactnativedatabase-39438",
  storageBucket: "reactnativedatabase-39438.appspot.com",
  messagingSenderId: "950339139393",
  appId: "1:950339139393:web:661e41de967d469a3753c0",
  // measurementId: "G-X3NBFBH5B3"
};

// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;

