// Import the required Firebase SDK modules
const {initializeApp} = require('firebase/app');
require('firebase/analytics'); // Optional: Only if you need analytics

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKJvgu7dusosnnOGP2WeuN2xEoahHGNhM",
  authDomain: "nodejs-456ce.firebaseapp.com",
  projectId: "nodejs-456ce",
  storageBucket: "nodejs-456ce.appspot.com",
  messagingSenderId: "259706066337",
  appId: "1:259706066337:web:6415911f516cf844ada7e0",
  measurementId: "G-V7YV64RCLM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Use Firebase SDK features
// TODO: Add the specific Firebase SDK modules you want to use

// Example: Using Firebase Realtime Database
const {getDatabase} = require('firebase/database');
const database = getDatabase(app);

// Example: Using Firebase Authentication
const {getAuth} = require('firebase/auth');
const auth = getAuth(app);

// Example: Using Firebase Cloud Messaging
const {getMessaging} = require('firebase/messaging');
const messaging = getMessaging(app);

// ... and so on

// You can now use the imported Firebase modules in your Node.js code
// Make sure to handle asynchronous operations appropriately

