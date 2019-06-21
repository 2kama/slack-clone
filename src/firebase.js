import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/functions'


// Initalize and export Firebase.
const config = {
    apiKey: "AIzaSyA--nqSflwh4nC2ndjlnR6IchXv6vkNNcA",
    authDomain: "minichat-4bdec.firebaseapp.com",
    databaseURL: "https://minichat-4bdec.firebaseio.com",
    projectId: "minichat-4bdec",
    storageBucket: "minichat-4bdec.appspot.com",
    messagingSenderId: "212734246002",
    appId: "1:212734246002:web:8f7bcf6a8c625209"
};

firebase.initializeApp(config)

// const settings = {timestampsInSnapshots: true};

// firebase.firestore().settings(settings)

export default firebase